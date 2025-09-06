
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { BarChart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart as ReChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const classData = [
  {
    subject: "Computer Networks",
    average: 85,
    highest: 98,
    lowest: 65,
    students: 45
  },
  {
    subject: "Database Systems",
    average: 78,
    highest: 95,
    lowest: 60,
    students: 42
  },
  {
    subject: "Software Engineering",
    average: 82,
    highest: 96,
    lowest: 68,
    students: 38
  },
  {
    subject: "Operating Systems",
    average: 75,
    highest: 92,
    lowest: 58,
    students: 40
  }
];

const ClassAverage = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Class Average</h1>
            <BarChart className="h-6 w-6 text-mu-blue" />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReChart data={classData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#4BA3D3" name="Class Average" />
                  </ReChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {classData.map((item) => (
              <Card key={item.subject}>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-mu-blue">{item.subject}</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class Average:</span>
                      <span className="font-medium">{item.average}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highest Mark:</span>
                      <span className="font-medium text-green-600">{item.highest}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lowest Mark:</span>
                      <span className="font-medium text-red-600">{item.lowest}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Students:</span>
                      <span className="font-medium">{item.students}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <AdminBottomNav />
      </MobileContainer>
    </div>
  );
};

export default ClassAverage;
