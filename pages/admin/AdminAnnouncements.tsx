import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Box } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { createAnnouncement, getAnnouncements, updateAnnouncement, deleteAnnouncement, Announcement } from '../../services/announcements';
import { useAuth } from '../../contexts/AuthContext';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { useIsMobile } from '../../hooks/use-mobile';
import { MessageSquare } from 'lucide-react';
import { toast } from "sonner";
import { seedDatabase } from '../../utils/seedData';

const AdminAnnouncements: React.FC = () => {
  const isMobile = useIsMobile();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    targetAudience: 'Everyone',
  });
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set up real-time listener for announcements
    const unsubscribe = getAnnouncements('admin', (data) => {
      setAnnouncements(data);
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleAddAnnouncement = () => {
    setEditingAnnouncement(null);
    setFormValues({
      title: '',
      content: '',
      targetAudience: 'Everyone',
    });
    setIsDialogOpen(true);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormValues({
      title: announcement.title,
      content: announcement.content,
      targetAudience: announcement.targetAudience,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await deleteAnnouncement(id);
        toast.success("Announcement deleted successfully");
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!formValues.title || !formValues.content) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (editingAnnouncement) {
        await updateAnnouncement(editingAnnouncement.id!, {
          title: formValues.title,
          content: formValues.content,
          targetAudience: formValues.targetAudience,
        });
        toast.success("Announcement updated successfully");
      } else {
        await createAnnouncement({
          title: formValues.title,
          content: formValues.content,
          targetAudience: formValues.targetAudience,
          createdBy: user?.email || 'Admin',
        });
        toast.success("Announcement created successfully");
      }
      
      // Close dialog and reset form
      setIsDialogOpen(false);
      setFormValues({
        title: '',
        content: '',
        targetAudience: 'Everyone',
      });
      setEditingAnnouncement(null);
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast.error("Failed to save announcement. Please try again.");
    }
  };

  const handleSeedData = async () => {
    try {
      setIsSubmitting(true);
      await seedDatabase();
      toast.success("Sample announcements created successfully!");
    } catch (error) {
      console.error('Error seeding data:', error);
      toast.error("Failed to create sample announcements");
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
            <h1 className="text-2xl font-bold">Announcements</h1>
              <p className="text-gray-500">View and manage announcements</p>
            </div>
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>

          <div className="flex gap-4 mb-6">
          <Button 
              className="flex-1 flex items-center justify-center"
            onClick={handleAddAnnouncement}
              disabled={isSubmitting}
          >
              <AddIcon className="h-4 w-4 mr-2" /> Add New
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center"
              onClick={handleSeedData}
              disabled={isSubmitting}
            >
              Create Sample Data
          </Button>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <Box>
                      <Typography variant="h6">{announcement.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posted on: {new Date(announcement.postedOn).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Target Audience: {announcement.targetAudience}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {announcement.content}
                      </Typography>
                    </Box>
                    <Box>
                      <Button 
                        startIcon={<EditIcon />}
                        onClick={() => handleEditAnnouncement(announcement)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button 
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDeleteAnnouncement(announcement.id!)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <AdminBottomNav />

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={formValues.title}
              onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Content"
              fullWidth
              multiline
              rows={4}
              value={formValues.content}
              onChange={(e) => setFormValues({ ...formValues, content: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              select
              margin="dense"
              label="Target Audience"
              fullWidth
              value={formValues.targetAudience}
              onChange={(e) => setFormValues({ ...formValues, targetAudience: e.target.value })}
            >
              <MenuItem value="Everyone">Everyone</MenuItem>
              <MenuItem value="Students">Students</MenuItem>
              <MenuItem value="Faculty">Faculty</MenuItem>
              <MenuItem value="Parents">Parents</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </MobileContainer>
    </div>
  );
};

export default AdminAnnouncements;
