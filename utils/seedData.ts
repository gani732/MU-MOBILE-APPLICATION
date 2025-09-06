import { createSampleAnnouncements } from '../services/announcements';

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Create sample announcements
    console.log('Creating sample announcements...');
    await createSampleAnnouncements();
    console.log('Sample announcements created successfully');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}; 