
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import ParentBottomNav from '../../components/parent/ParentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Mail, Phone, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const facultyData = [
  {
    id: 1,
    name: 'Dr. John Wilson',
    role: 'Professor & Head of Department',
    subject: 'Mathematics',
    email: 'john.wilson@mu-example.edu',
    phone: '+91 98765 43210'
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    role: 'Associate Professor',
    subject: 'Database Systems',
    email: 'sarah.johnson@mu-example.edu',
    phone: '+91 87654 32109'
  },
  {
    id: 3,
    name: 'Prof. Michael Brown',
    role: 'Assistant Professor',
    subject: 'Data Structures',
    email: 'michael.brown@mu-example.edu',
    phone: '+91 76543 21098'
  },
  {
    id: 4,
    name: 'Dr. Emily Davis',
    role: 'Professor',
    subject: 'Computer Networks',
    email: 'emily.davis@mu-example.edu',
    phone: '+91 65432 10987'
  },
  {
    id: 5,
    name: 'Prof. Robert Garcia',
    role: 'Assistant Professor',
    subject: 'Software Engineering',
    email: 'robert.garcia@mu-example.edu',
    phone: '+91 54321 09876'
  },
  {
    id: 6,
    name: 'Dr. Amanda Lee',
    role: 'Associate Professor',
    subject: 'Operating Systems',
    email: 'amanda.lee@mu-example.edu',
    phone: '+91 43210 98765'
  },
  {
    id: 7,
    name: 'Prof. David Martin',
    role: 'Associate Professor',
    subject: 'Physics',
    email: 'david.martin@mu-example.edu',
    phone: '+91 32109 87654'
  },
  {
    id: 8,
    name: 'Dr. Lisa Chen',
    role: 'Assistant Professor',
    subject: 'Machine Learning',
    email: 'lisa.chen@mu-example.edu',
    phone: '+91 21098 76543'
  }
];

const FacultyContacts: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredFaculty = facultyData.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Faculty Contacts</h1>
            <User className="h-6 w-6 text-mu-blue" />
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name, subject, or role"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mu-blue focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Faculty list */}
          <div className="space-y-4">
            {filteredFaculty.map(faculty => (
              <div key={faculty.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-800 font-semibold">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{faculty.name}</h3>
                    <p className="text-sm text-gray-500">{faculty.role}</p>
                    <p className="text-sm text-mu-blue font-medium">{faculty.subject}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center text-xs"
                        onClick={() => window.location.href = `mailto:${faculty.email}`}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center text-xs"
                        onClick={() => window.location.href = `tel:${faculty.phone.replace(/\s/g, '')}`}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredFaculty.length === 0 && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No faculty found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
        <ParentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default FacultyContacts;
