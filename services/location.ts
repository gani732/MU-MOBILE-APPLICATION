import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

export const requestLocationPermissions = async (): Promise<boolean> => {
  try {
    const permission = await Geolocation.requestPermissions();
    return permission.location === 'granted';
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    return false;
  }
};

export const getCurrentLocation = async (): Promise<LocationData | null> => {
  try {
    if (!Capacitor.isNativePlatform()) {
      throw new Error('Location tracking is only available on native platforms');
    }

    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
      timestamp: new Date(coordinates.timestamp),
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
};

export const saveLocationToFirestore = async (
  userId: string,
  location: LocationData
): Promise<void> => {
  try {
    const locationsRef = collection(db, 'locations', userId, 'tracking');
    await addDoc(locationsRef, {
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving location to Firestore:', error);
    throw error;
  }
};

export const startLocationTracking = async (
  userId: string,
  interval: number = 300000 // 5 minutes default
): Promise<() => void> => {
  const hasPermission = await requestLocationPermissions();
  if (!hasPermission) {
    throw new Error('Location permissions not granted');
  }

  const trackingInterval = setInterval(async () => {
    const location = await getCurrentLocation();
    if (location) {
      await saveLocationToFirestore(userId, location);
    }
  }, interval);

  // Return cleanup function
  return () => clearInterval(trackingInterval);
}; 