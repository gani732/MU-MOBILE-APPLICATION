
import React, { useState } from 'react';
import MobileContainer from '../components/MobileContainer';
import StudentBottomNav from '../components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const assignmentsData = [
  {
    id: 1,
    title: 'Data Structures Implementation',
    subject: 'Data Structures and Algorithms',
    dueDate: 'May 5, 2025',
    status: 'Pending',
    marks: '30'
  },
  {
    id: 2,
    title: 'Database Schema Design',
    subject: 'Database Management Systems',
    dueDate: 'May 8, 2025',
    status: 'Submitted',
    marks: '25'
  },
  {
    id: 3,
    title: 'Process Scheduling Algorithm',
    subject: 'Operating Systems',
    dueDate: 'May 10, 2025',
    status: 'In Progress',
    marks: '40'
  },
  {
    id: 4,
    title: 'Network Protocol Analysis',
    subject: 'Computer Networks',
    dueDate: 'May 12, 2025',
    status: 'Pending',
    marks: '35'
  },
  {
    id: 5,
    title: 'Software Design Patterns',
    subject: 'Software Engineering',
    dueDate: 'May 15, 2025',
    status: 'Not Started',
    marks: '50'
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in progress':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Assignments: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [assignmentDetails, setAssignmentDetails] = useState({
    title: '',
    subject: '',
    dueDate: '',
    marks: '',
  });

  const handleAddAssignment = () => {
    if (!assignmentDetails.title || !assignmentDetails.subject || !assignmentDetails.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Assignment Added",
      description: `${assignmentDetails.title} has been added to your assignments.`,
    });
    
    setOpen(false);
    // Reset form
    setAssignmentDetails({
      title: '',
      subject: '',
      dueDate: '',
      marks: '',
    });
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Assignments</h1>
            <Button 
              className="bg-[#0EA5E9] hover:bg-[#0284c7] flex items-center gap-2 text-white"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <PlusCircle size={16} />
              <span className="hidden sm:inline">New</span>
            </Button>
          </div>

          <div className="space-y-4">
            {assignmentsData.map((assignment) => (
              <div key={assignment.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{assignment.title}</h3>
                  <span className={`px-2 py-1 rounded-md text-sm ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{assignment.subject}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <p className="text-mu-red">Due: {assignment.dueDate}</p>
                  <p className="text-mu-blue">Marks: {assignment.marks}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Assignment Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title*</label>
                <Input 
                  value={assignmentDetails.title} 
                  onChange={(e) => setAssignmentDetails({...assignmentDetails, title: e.target.value})}
                  placeholder="Assignment title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject*</label>
                <Input 
                  value={assignmentDetails.subject} 
                  onChange={(e) => setAssignmentDetails({...assignmentDetails, subject: e.target.value})}
                  placeholder="Subject name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date*</label>
                <Input 
                  type="date"
                  value={assignmentDetails.dueDate} 
                  onChange={(e) => setAssignmentDetails({...assignmentDetails, dueDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Marks</label>
                <Input 
                  type="number"
                  value={assignmentDetails.marks} 
                  onChange={(e) => setAssignmentDetails({...assignmentDetails, marks: e.target.value})}
                  placeholder="Total marks"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAssignment} className="bg-[#0EA5E9] hover:bg-[#0284c7]">Add Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default Assignments;
