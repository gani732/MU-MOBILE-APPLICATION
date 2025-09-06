import React, { useEffect, useState } from 'react';
import { StudentLocationMap } from '../components/StudentLocationMap';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

interface StudentInfo {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  year: string;
}

export const ParentLocationTracker: React.FC = () => {
  const { user } = useAuth();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Query the students collection to find the student associated with this parent
        const studentsRef = collection(db, 'students');
        const q = query(studentsRef, where('parentId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('No student found associated with this parent account');
          return;
        }

        const studentDoc = querySnapshot.docs[0];
        setStudentInfo({
          id: studentDoc.id,
          name: studentDoc.data().name || 'John Smith', // Fallback for demo
          rollNumber: studentDoc.data().rollNumber || 'CSE2024001',
          course: studentDoc.data().course || 'B.Tech CSE',
          year: studentDoc.data().year || '2nd Year'
        });
      } catch (err) {
        console.error('Error fetching student information:', err);
        setError('Failed to fetch student information');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, [user]);

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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Student Location Tracker</h1>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-semibold">{studentInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Roll Number</p>
                <p className="font-semibold">{studentInfo.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-semibold">{studentInfo.course}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Year</p>
                <p className="font-semibold">{studentInfo.year}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <StudentLocationMap studentId={studentInfo.id} />
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Location updates every 15 seconds. Last known location will be displayed on the map.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 