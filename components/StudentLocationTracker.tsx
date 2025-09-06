import React, { useEffect, useState } from 'react';
import { startLocationTracking } from '../services/location';
import { useAuth } from '../contexts/AuthContext';

export const StudentLocationTracker: React.FC = () => {
  const { user } = useAuth();
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const startTracking = async () => {
      if (!user) return;

      try {
        cleanup = await startLocationTracking(user.uid, 300000); // 5 minutes interval
        setIsTracking(true);
      } catch (err) {
        setError('Failed to start location tracking');
        console.error(err);
      }
    };

    startTracking();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [user]);

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p>Please log in to enable location tracking</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Location Tracking</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">
              Status: {isTracking ? 'Active' : 'Inactive'}
            </p>
            <p className="text-sm text-gray-600">
              Your location is being tracked every 5 minutes
            </p>
          </div>
          <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}; 