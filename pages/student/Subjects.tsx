
import React, { useState } from 'react';
import MobileContainer from '../../components/MobileContainer';
import StudentBottomNav from '../../components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const subjectsData = [
  {
    id: 1,
    name: 'Data Structures and Algorithms',
    professor: 'Prof. John Smith',
    credits: 4,
    code: 'CS201'
  },
  {
    id: 2,
    name: 'Database Management Systems',
    professor: 'Prof. Sarah Johnson',
    credits: 3,
    code: 'CS301'
  },
  {
    id: 3,
    name: 'Operating Systems',
    professor: 'Prof. Mike Wilson',
    credits: 4,
    code: 'CS302'
  },
  {
    id: 4,
    name: 'Computer Networks',
    professor: 'Prof. Emily Brown',
    credits: 3,
    code: 'CS401'
  },
  {
    id: 5,
    name: 'Software Engineering',
    professor: 'Prof. David Lee',
    credits: 4,
    code: 'CS402'
  }
];

const Subjects: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [subjectDetails, setSubjectDetails] = useState({
    name: '',
    professor: '',
    code: '',
    credits: '',
  });

  const handleAddSubject = () => {
    if (!subjectDetails.name || !subjectDetails.professor || !subjectDetails.code) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Subject Added",
      description: `${subjectDetails.name} has been added to your subjects.`,
    });
    
    setOpen(false);
    // Reset form
    setSubjectDetails({
      name: '',
      professor: '',
      code: '',
      credits: '',
    });
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Subjects</h1>
            <Button 
              variant="ghost" 
              size="icon"
              className="relative rounded-full bg-[#6E59A5] text-white hover:bg-[#7E69AB]"
              onClick={() => setOpen(true)}
            >
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            {subjectsData.map((subject) => (
              <div key={subject.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.professor}</p>
                    <p className="text-sm text-gray-500">Course Code: {subject.code}</p>
                  </div>
                  <span className="px-2 py-1 bg-mu-blue/10 text-mu-blue rounded-md text-sm">
                    {subject.credits} Credits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Subject Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject Name*</label>
                <Input 
                  value={subjectDetails.name} 
                  onChange={(e) => setSubjectDetails({...subjectDetails, name: e.target.value})}
                  placeholder="Subject name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Professor*</label>
                <Input 
                  value={subjectDetails.professor} 
                  onChange={(e) => setSubjectDetails({...subjectDetails, professor: e.target.value})}
                  placeholder="Professor name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Course Code*</label>
                <Input 
                  value={subjectDetails.code} 
                  onChange={(e) => setSubjectDetails({...subjectDetails, code: e.target.value})}
                  placeholder="e.g. CS201"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Credits</label>
                <Input 
                  type="number"
                  value={subjectDetails.credits} 
                  onChange={(e) => setSubjectDetails({...subjectDetails, credits: e.target.value})}
                  placeholder="Number of credits"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddSubject} className="bg-[#6E59A5] hover:bg-[#7E69AB]">Add Subject</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default Subjects;
