
import React from 'react';
import MobileContainer from '../components/MobileContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';

const TaskUpload: React.FC = () => {
  const isMobile = useIsMobile();
  const [showDialog, setShowDialog] = React.useState(false);
  
  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex items-center mb-6">
            <button className="mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="flex items-center bg-green-100 rounded-full px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="font-medium">Biology</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 mb-6">
            <h1 className="text-xl font-bold mb-2">Doing Personal Task</h1>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames velit
            </p>
            <div className="bg-gray-100 rounded-md px-4 py-3 mb-4">
              Biology task.txt
            </div>
            <Button 
              className="w-full bg-mu-blue text-white hover:bg-blue-600"
              onClick={() => setShowDialog(true)}
            >
              Upload
            </Button>
          </div>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="rounded-xl p-0 max-w-md">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-mu-blue rounded-full flex items-center justify-center text-white">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Success</h2>
              <p className="text-gray-500 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames velit
              </p>
              <Button 
                variant="outline" 
                className="w-full border-mu-blue text-mu-blue hover:bg-mu-blue hover:text-white"
                onClick={() => setShowDialog(false)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </MobileContainer>
    </div>
  );
};

export default TaskUpload;
