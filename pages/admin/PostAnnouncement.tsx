import React, { useState } from 'react';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageSquare } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { createAnnouncement } from '../../services/announcements';
import { useAuth } from '../../contexts/AuthContext';

interface FormData {
  title: string;
  content: string;
  targetAudience: string;
  type: 'general' | 'academic' | 'event';
  priority: 'low' | 'medium' | 'high';
  department: string;
  expiresAt: string;
}

const PostAnnouncement = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    targetAudience: 'all',
    type: 'general',
    priority: 'medium',
    department: '',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await createAnnouncement({
        ...formData,
        expiresAt: new Date(formData.expiresAt).toISOString(),
        createdBy: user?.email || 'Admin'
      });
    toast.success("Announcement posted successfully!");
      // Reset form
      setFormData({
        title: '',
        content: '',
        targetAudience: 'all',
        type: 'general',
        priority: 'medium',
        department: '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error("Failed to create announcement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Post Announcement</h1>
              <p className="text-gray-500">Create new announcements</p>
            </div>
            <MessageSquare className="h-6 w-6 text-mu-blue" />
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter announcement title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter announcement details"
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                  <select
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 bg-white"
                    required
                  >
                  <option value="all">All Students</option>
                  <option value="cse">CSE Department</option>
                  <option value="ece">ECE Department</option>
                  <option value="me">ME Department</option>
                  <option value="faculty">Faculty Only</option>
                  <option value="parents">Parents Only</option>
                </select>
              </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 bg-white"
                    required
                  >
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 bg-white"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input
                    type="date"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                {formData.targetAudience === 'cse' || formData.targetAudience === 'ece' || formData.targetAudience === 'me' ? (
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium">Department</label>
                    <Input
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Enter department name"
                      required
                    />
                  </div>
                ) : null}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-mu-blue hover:bg-mu-blue/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post Announcement'}
              </Button>
            </form>
          </Card>
        </div>
        <AdminBottomNav />
      </MobileContainer>
    </div>
  );
};

export default PostAnnouncement;

