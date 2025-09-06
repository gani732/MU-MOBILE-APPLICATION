import React, { useState } from 'react';
import MobileContainer from '../../components/MobileContainer';
import StudentBottomNav from '../../components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  location: string;
  type: 'class' | 'lab' | 'exam' | 'meeting';
  description?: string;
}

const events: ScheduleEvent[] = [
  { 
    id: '1', 
    title: 'Data Structures and Algorithms', 
    time: '9:00 AM - 10:30 AM', 
    location: 'Room 301', 
    type: 'class', 
    description: 'Binary Trees and Graph Algorithms' 
  },
  { 
    id: '2', 
    title: 'Database Systems Lab', 
    time: '11:00 AM - 1:00 PM', 
    location: 'Lab 101', 
    type: 'lab', 
    description: 'SQL Queries and Database Design' 
  },
  { 
    id: '3', 
    title: 'Operating Systems Quiz', 
    time: '2:00 PM - 3:00 PM', 
    location: 'Room 201', 
    type: 'exam', 
    description: 'Process Management and Scheduling' 
  },
  { 
    id: '4', 
    title: 'Computer Networks', 
    time: '3:30 PM - 5:00 PM', 
    location: 'Room 302', 
    type: 'class', 
    description: 'TCP/IP Protocol Suite' 
  },
  { 
    id: '5', 
    title: 'Project Team Meeting', 
    time: '5:15 PM - 6:00 PM', 
    location: 'Study Hall 2', 
    type: 'meeting', 
    description: 'Final Year Project Discussion' 
  },
];

const StudentSchedule: React.FC = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<'day' | 'week'>('day');
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [scheduleDetails, setScheduleDetails] = useState({
    title: '',
    type: 'class' as 'class' | 'lab' | 'exam' | 'meeting',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
  });

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const getWeekEvents = () => {
    const weekEvents = [];
    const today = new Date(date);
    
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() - today.getDay() + i);
      
      weekEvents.push({
        day: currentDay.toLocaleDateString('en-US', { weekday: 'short' }),
        date: currentDay.getDate(),
        events: i % 2 === 0 ? events.slice(0, 3) : events.slice(2, 5)
      });
    }
    
    return weekEvents;
  };

  const handleAddSchedule = () => {
    if (!scheduleDetails.title || !scheduleDetails.startTime || !scheduleDetails.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Event Added",
      description: `${scheduleDetails.title} has been added to your schedule.`,
    });
    
    setOpen(false);
    setScheduleDetails({
      title: '',
      type: 'class',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
    });
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Schedule</h1>
            <Button 
              className="bg-[#F97316] hover:bg-[#ea580c] flex items-center gap-2 text-white"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <PlusCircle size={16} />
              <span className="hidden sm:inline">Event</span>
            </Button>
          </div>
          
          <Tabs defaultValue="day" className="mb-6">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="day" className="flex-1" onClick={() => setViewType('day')}>Day</TabsTrigger>
              <TabsTrigger value="week" className="flex-1" onClick={() => setViewType('week')}>Week</TabsTrigger>
            </TabsList>
            
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border w-full bg-white mb-4"
            />
            
            <div className="text-center my-4 text-lg font-medium text-gray-700">
              {formatDate(date)}
            </div>
            
            <TabsContent value="day" className="space-y-4 mt-2">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-full self-stretch rounded-full ${
                        event.type === 'class' ? 'bg-mu-blue' :
                        event.type === 'lab' ? 'bg-mu-green' :
                        event.type === 'exam' ? 'bg-mu-red' :
                        'bg-mu-yellow'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <Clock className="h-4 w-4 mr-1" />
                          <p>{event.time}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <p>{event.location}</p>
                        </div>
                        {event.description && (
                          <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                            {event.description}
                          </p>
                        )}
                      </div>
                      <div className="px-2 py-1 rounded text-xs font-medium capitalize bg-gray-100">
                        {event.type}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No events scheduled for this day.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="week">
              <div className="overflow-x-auto">
                <div className="flex space-x-2 min-w-max">
                  {getWeekEvents().map((day, index) => (
                    <div key={index} className="w-32 flex-shrink-0">
                      <div className="text-center mb-2">
                        <div className="font-medium">{day.day}</div>
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                          new Date().getDate() === day.date ? 'bg-mu-blue text-white' : 'bg-gray-100'
                        }`}>
                          {day.date}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {day.events.map((event, eventIndex) => (
                          <div 
                            key={eventIndex} 
                            className={`p-2 rounded-md text-xs font-medium ${
                              event.type === 'class' ? 'bg-mu-blue/10 text-mu-blue' :
                              event.type === 'lab' ? 'bg-mu-green/10 text-mu-green' :
                              event.type === 'exam' ? 'bg-mu-red/10 text-mu-red' :
                              'bg-mu-yellow/10 text-mu-yellow'
                            }`}
                          >
                            <div className="truncate font-bold">{event.title}</div>
                            <div className="mt-1">{event.time.split(' - ')[0]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Schedule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title*</label>
                <Input 
                  value={scheduleDetails.title} 
                  onChange={(e) => setScheduleDetails({...scheduleDetails, title: e.target.value})}
                  placeholder="Event title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Type</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={scheduleDetails.type}
                  onChange={(e) => setScheduleDetails({...scheduleDetails, type: e.target.value as 'class' | 'lab' | 'exam' | 'meeting'})}
                >
                  <option value="class">Class</option>
                  <option value="lab">Lab</option>
                  <option value="exam">Exam</option>
                  <option value="meeting">Meeting</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time*</label>
                  <Input 
                    type="time"
                    value={scheduleDetails.startTime} 
                    onChange={(e) => setScheduleDetails({...scheduleDetails, startTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <Input 
                    type="time"
                    value={scheduleDetails.endTime} 
                    onChange={(e) => setScheduleDetails({...scheduleDetails, endTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location*</label>
                <Input 
                  value={scheduleDetails.location} 
                  onChange={(e) => setScheduleDetails({...scheduleDetails, location: e.target.value})}
                  placeholder="Room number or location"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input 
                  value={scheduleDetails.description} 
                  onChange={(e) => setScheduleDetails({...scheduleDetails, description: e.target.value})}
                  placeholder="Additional details"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddSchedule} className="bg-[#F97316] hover:bg-[#ea580c]">Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default StudentSchedule;
