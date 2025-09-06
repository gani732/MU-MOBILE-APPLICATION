import React, { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

interface StudentLocationMapProps {
  studentId: string;
  refreshInterval?: number;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const StudentLocationMap: React.FC<StudentLocationMapProps> = ({
  studentId,
  refreshInterval = 15000,
}) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Google Maps
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setError('Google Maps API key is not configured. Please check your environment variables.');
      console.error('Missing VITE_GOOGLE_MAPS_API_KEY environment variable');
      return;
    }

    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = (error) => {
          console.error('Google Maps script loading error:', error);
          setError('Failed to load Google Maps. Please check your API key and ensure it has the correct permissions and restrictions.');
        };
        document.head.appendChild(script);

        window.initMap = () => {
          try {
            if (mapContainerRef.current) {
              const defaultLocation = { lat: 17.3850, lng: 78.4867 }; // Hyderabad coordinates
              mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
                center: defaultLocation,
                zoom: 15,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                  }
                ],
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                zoomControl: true,
              });
              setMapLoaded(true);
              console.log('Map initialized successfully');
            }
          } catch (error) {
            console.error('Error initializing map:', error);
            setError('Failed to initialize map. Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
          }
        };
      } else {
        window.initMap();
      }
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
      if (script) {
        script.remove();
      }
      // Reset state
      setMapLoaded(false);
      setError(null);
    };
  }, []);

  // Listen for location updates
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    console.log('Setting up location listener for student:', studentId);
    const locationsRef = collection(db, 'locations', studentId, 'tracking');
    const q = query(locationsRef, orderBy('timestamp', 'desc'), limit(1));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty && mapRef.current) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          const newLocation: LocationData = {
            latitude: data.latitude,
            longitude: data.longitude,
            timestamp: data.timestamp.toDate(),
          };
          console.log('Received new location:', newLocation);
          setLocation(newLocation);

          const position = {
            lat: newLocation.latitude,
            lng: newLocation.longitude
          };

          // Update map center with animation
          mapRef.current.panTo(position);

          // Update or create marker
          if (markerRef.current) {
            markerRef.current.setPosition(position);
          } else {
            markerRef.current = new window.google.maps.Marker({
              position,
              map: mapRef.current,
              title: 'Student Location',
              animation: window.google.maps.Animation.DROP
            });
          }

          // Update or create accuracy circle
          if (circleRef.current) {
            circleRef.current.setCenter(position);
          } else {
            circleRef.current = new window.google.maps.Circle({
              strokeColor: '#4285F4',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#4285F4',
              fillOpacity: 0.2,
              map: mapRef.current,
              center: position,
              radius: 50 // 50 meters
            });
          }

          // Update info window content
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-semibold">Student Location</h3>
                <p class="text-sm">Last updated: ${newLocation.timestamp.toLocaleString()}</p>
              </div>
            `
          });

          markerRef.current.addListener('click', () => {
            infoWindow.open(mapRef.current, markerRef.current);
          });
        } else {
          console.log('No location data available');
          setError('No location data available for this student');
        }
      },
      (err) => {
        console.error('Error fetching location data:', err);
        setError('Error fetching location data. Please try again later.');
      }
    );

    return () => unsubscribe();
  }, [studentId, mapRef.current, mapLoaded]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 mb-2">{error}</p>
        <p className="text-sm text-red-500">
          Please ensure you have:
          <ul className="list-disc list-inside mt-1">
            <li>A valid Google Maps API key in your environment variables</li>
            <li>Proper permissions enabled in the Google Cloud Console</li>
            <li>A stable internet connection</li>
          </ul>
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] relative">
      <div 
        ref={mapContainerRef}
        className="w-full h-full rounded-lg shadow-lg"
      />
      {location && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
          <p className="text-sm font-semibold mb-1">Student Location</p>
          <p className="text-xs text-gray-600">
            Last updated: {location.timestamp.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600">
            Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
}; 