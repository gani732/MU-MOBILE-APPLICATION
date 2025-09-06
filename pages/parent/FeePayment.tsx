
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import ParentBottomNav from '../../components/parent/ParentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { CreditCard, FileText, Check, AlertCircle } from 'lucide-react';

const feeData = [
  {
    id: 1,
    term: 'Autumn Semester 2024',
    amount: 145000,
    status: 'Paid',
    dueDate: 'September 15, 2024',
    receiptNo: 'MU24-09876'
  },
  {
    id: 2,
    term: 'Spring Semester 2025',
    amount: 145000,
    status: 'Due',
    dueDate: 'February 15, 2025'
  },
  {
    id: 3,
    term: 'Hostel Fee 2024-25',
    amount: 85000,
    status: 'Paid',
    dueDate: 'August 30, 2024',
    receiptNo: 'MUH24-65432'
  },
  {
    id: 4,
    term: 'Exam Fee - Spring 2025',
    amount: 5000,
    status: 'Due',
    dueDate: 'May 15, 2025'
  }
];

const FeePayment: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Fee Payment</h1>
            <CreditCard className="h-6 w-6 text-mu-blue" />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Student Name:</span>
                <span className="font-medium">John Smith</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Registration No:</span>
                <span className="font-medium">MU221034</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Program:</span>
                <span className="font-medium">B.Tech CSE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Year:</span>
                <span className="font-medium">2nd Year</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment History</h2>
            <div className="space-y-4">
              {feeData.map((fee) => (
                <div key={fee.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{fee.term}</h3>
                      <p className="text-gray-500 text-sm">Due: {fee.dueDate}</p>
                      {fee.receiptNo && (
                        <p className="text-gray-500 text-sm">Receipt: {fee.receiptNo}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-mu-red">₹{fee.amount.toLocaleString()}</span>
                      <span className={`text-sm px-2 py-0.5 rounded mt-1 flex items-center ${
                        fee.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {fee.status === 'Paid' ? (
                          <><Check size={12} className="mr-1" /> {fee.status}</>
                        ) : (
                          <><AlertCircle size={12} className="mr-1" /> {fee.status}</>
                        )}
                      </span>
                    </div>
                  </div>
                  {fee.status === 'Due' && (
                    <Button className="w-full mt-3 bg-mu-red hover:bg-mu-red/90">
                      Pay Now
                    </Button>
                  )}
                  {fee.status === 'Paid' && (
                    <Button variant="outline" className="w-full mt-3 text-mu-blue border-mu-blue">
                      <FileText className="h-4 w-4 mr-2" /> Download Receipt
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-3">Payment Methods</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <span className="text-sm">Credit/Debit Card</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <span className="text-sm">Net Banking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm">UPI Payment</span>
              </div>
            </div>
          </div>
        </div>
        <ParentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default FeePayment;
