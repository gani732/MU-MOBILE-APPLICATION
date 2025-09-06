import React, { useEffect, useState } from 'react';
import MobileContainer from '../../components/MobileContainer';
import ParentBottomNav from '../../components/parent/ParentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { StudentLocationMap } from '../../components/StudentLocationMap';
import { useAuth } from '../../contexts/AuthContext';
import { ensureStudentExists, Student } from '../../services/students';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

interface StudentInfo {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  year: string;
}

const StudentLocation: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (!user) {
        console.log('No user found, skipping fetch');
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching student info for parent:', user.uid);
        
        // This will create a sample student if none exists
        const student = await ensureStudentExists(user.uid) as Student;
        console.log('Student data received:', student);
        
        if (!student) {
          console.error('No student data returned');
          throw new Error('Failed to retrieve student data');
        }

        if (!student.id) {
          console.error('Student data missing ID:', student);
          throw new Error('Student data is missing ID');
        }

        console.log('Setting student info with:', {
          id: student.id,
          name: student.name,
          rollNumber: student.rollNumber,
          course: student.course,
          year: student.year
        });

        setStudentInfo({
          id: student.id,
          name: student.name,
          rollNumber: student.rollNumber,
          course: student.course,
          year: student.year
        });

        // Verify location data exists
        const locationRef = doc(db, 'locations', student.id, 'tracking', 'current');
        console.log('Checking location data at path:', locationRef.path);
        
        const locationDoc = await getDoc(locationRef);
        console.log('Location data exists:', locationDoc.exists());
        
        if (locationDoc.exists()) {
          console.log('Location data:', locationDoc.data());
        } else {
          console.log('No location data found, creating initial location...');
          try {
            // Create initial location if it doesn't exist
            const locationData = {
              latitude: 17.3850,
              longitude: 78.4867,
              timestamp: new Date(),
              accuracy: 50,
              speed: 0,
              heading: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              isMoving: false,
              provider: 'gps',
              activity: 'still'
            };
            
            console.log('Creating location data:', locationData);
            await setDoc(locationRef, locationData);
            console.log('Initial location data created successfully');
          } catch (locationError) {
            console.error('Error creating initial location:', locationError);
            throw new Error('Failed to create initial location data: ' + (locationError instanceof Error ? locationError.message : 'Unknown error'));
          }
        }
        
        toast({
          title: "Location Tracking Active",
          description: "You can now view your student's location in real-time.",
        });
      } catch (err) {
        console.error('Error in fetchStudentInfo:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch student information';
        console.error('Error details:', errorMessage);
        setError(errorMessage);
        toast({
          title: "Error",
          description: "Failed to load student information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, [user, toast]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Restricted</h2>
          <p className="text-gray-600">Please log in to view student location</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-mu-blue text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!studentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Student Found</h2>
          <p className="text-gray-600">No student information is available</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-mu-blue text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Student Location</h1>
            <Navigation className="h-6 w-6 text-mu-blue" />
          </div>

          {/* Student details */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold">
                  {studentInfo.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{studentInfo.name}</h3>
                <p className="text-sm text-gray-500">
                  {studentInfo.course}, {studentInfo.year}
                </p>
                <p className="text-xs text-gray-400">Roll No: {studentInfo.rollNumber}</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Current Location</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <StudentLocationMap studentId={studentInfo.id} />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-mu-blue">
                <MapPin size={16} className="mr-1" />
                <span className="font-medium">Live Location</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock size={14} className="mr-1" />
                <span className="text-sm">Updates every 15 seconds</span>
              </div>
            </div>
          </div>
        </div>
        <ParentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default StudentLocation;

