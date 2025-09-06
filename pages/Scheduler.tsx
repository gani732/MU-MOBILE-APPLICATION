
import React from 'react';
import MobileContainer from '../components/MobileContainer';
import BottomNavbar from '../components/BottomNavbar';
import { Calendar } from '@/components/ui/calendar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Scheduler: React.FC = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-20">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Scheduler</h1>
            <Button variant="ghost" size="icon" className="relative">
              <PlusCircle className="h-6 w-6" />
            </Button>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border w-full"
          />

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {/* Example schedule items */}
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Mathematics Class</h3>
                    <p className="text-sm text-gray-500">9:00 AM - 10:30 AM</p>
                  </div>
                  <span className="px-2 py-1 bg-mu-blue/10 text-mu-blue rounded-md text-sm">
                    Room 201
                  </span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Physics Lab</h3>
                    <p className="text-sm text-gray-500">11:00 AM - 1:00 PM</p>
                  </div>
                  <span className="px-2 py-1 bg-mu-blue/10 text-mu-blue rounded-md text-sm">
                    Lab 101
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </MobileContainer>
    </div>
  );
};

export default Scheduler;
