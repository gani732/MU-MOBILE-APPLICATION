
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import ParentBottomNav from '../../components/parent/ParentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Award, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

const semesterData = [
  {
    id: 1,
    name: 'Semester 1',
    gpa: 8.5,
    expanded: true,
    subjects: [
      { name: 'Engineering Mathematics I', grade: 'A', points: 9 },
      { name: 'Introduction to Programming', grade: 'A+', points: 10 },
      { name: 'Engineering Physics', grade: 'B+', points: 8 },
      { name: 'Engineering Drawing', grade: 'A', points: 9 },
      { name: 'Communication Skills', grade: 'A-', points: 8 }
    ]
  },
  {
    id: 2,
    name: 'Semester 2',
    gpa: 8.8,
    expanded: false,
    subjects: [
      { name: 'Engineering Mathematics II', grade: 'A', points: 9 },
      { name: 'Data Structures', grade: 'A+', points: 10 },
      { name: 'Basic Electronics', grade: 'B+', points: 8 },
      { name: 'Digital Logic Design', grade: 'A', points: 9 },
      { name: 'Environmental Studies', grade: 'A', points: 9 }
    ]
  },
  {
    id: 3,
    name: 'Semester 3',
    gpa: 8.6,
    expanded: false,
    subjects: [
      { name: 'Discrete Mathematics', grade: 'B+', points: 8 },
      { name: 'Object Oriented Programming', grade: 'A', points: 9 },
      { name: 'Computer Organization', grade: 'A-', points: 8 },
      { name: 'Probability & Statistics', grade: 'B+', points: 8 },
      { name: 'Economics for Engineers', grade: 'A', points: 9 }
    ]
  },
  {
    id: 4,
    name: 'Semester 4',
    gpa: 8.7,
    expanded: false,
    subjects: [
      { name: 'Design & Analysis of Algorithms', grade: 'A-', points: 8 },
      { name: 'Database Management Systems', grade: 'A', points: 9 },
      { name: 'Operating Systems', grade: 'A', points: 9 },
      { name: 'Computer Networks', grade: 'B+', points: 8 },
      { name: 'Software Engineering', grade: 'A+', points: 10 }
    ]
  }
];

const getGradeColor = (grade: string) => {
  if (grade.startsWith('A+')) return 'text-green-600';
  if (grade.startsWith('A')) return 'text-green-500';
  if (grade.startsWith('B+')) return 'text-blue-500';
  if (grade.startsWith('B')) return 'text-blue-400';
  if (grade.startsWith('C')) return 'text-yellow-500';
  return 'text-red-500'; // D or F
};

const MarksOverview: React.FC = () => {
  const isMobile = useIsMobile();
  const [semesters, setSemesters] = React.useState(semesterData);
  
  const toggleSemester = (id: number) => {
    setSemesters(semesters.map(sem => 
      sem.id === id ? {...sem, expanded: !sem.expanded} : sem
    ));
  };

  // Calculate overall CGPA
  const totalPoints = semesters.reduce((sum, sem) => sum + sem.gpa, 0);
  const cgpa = (totalPoints / semesters.length).toFixed(2);

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Marks Overview</h1>
            <Award className="h-6 w-6 text-mu-blue" />
          </div>

          {/* Student details */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold">JS</span>
              </div>
              <div>
                <h3 className="font-semibold">John Smith</h3>
                <p className="text-sm text-gray-500">B.Tech CSE, 2nd Year</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-gray-500">CGPA</p>
                <p className="text-xl font-bold text-mu-blue">{cgpa}/10</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Current Standing</p>
                <p className="font-medium text-green-600">Excellent</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Completed</p>
                <p className="font-medium">{semesters.length} Semesters</p>
              </div>
            </div>
          </div>

          {/* Semester-wise marks */}
          <div className="space-y-4">
            {semesters.map(semester => (
              <div key={semester.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSemester(semester.id)}
                >
                  <div className="flex items-center">
                    <BookOpen size={18} className="mr-2 text-mu-blue" />
                    <h3 className="font-semibold">{semester.name}</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <span className="font-medium text-mu-blue">{semester.gpa}</span>
                      <span className="text-gray-500 text-sm">/10</span>
                    </div>
                    {semester.expanded ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </div>
                </div>
                {semester.expanded && (
                  <div className="border-t border-gray-100">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left text-xs text-gray-500 p-3">Subject</th>
                          <th className="text-center text-xs text-gray-500 p-3">Grade</th>
                          <th className="text-right text-xs text-gray-500 p-3">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.subjects.map((subject, idx) => (
                          <tr key={idx} className="border-t border-gray-100">
                            <td className="p-3 text-sm">{subject.name}</td>
                            <td className={`p-3 text-sm text-center font-medium ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </td>
                            <td className="p-3 text-sm text-right">{subject.points}/10</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <ParentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default MarksOverview;
