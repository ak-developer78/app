
import { Announcement } from '../types';

const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Final Exam Schedule Published',
    message: 'The final exam schedule for the current semester has been published. Please check the "Exams" section for your schedule.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ann-2',
    title: 'Library Holiday Hours',
    message: 'The campus library will be operating on reduced hours during the upcoming holiday break. Please check the library website for details.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
   {
    id: 'ann-3',
    title: 'Course Registration for Next Semester',
    message: 'Registration for the next semester opens next week. Please consult with your academic advisor to plan your courses.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const getAnnouncements = (): Promise<Announcement[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a sorted copy
      resolve([...mockAnnouncements].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, 500);
  });
};

export const createAnnouncement = (data: { title: string; message: string }): Promise<Announcement> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAnnouncement: Announcement = {
        id: `ann-${Date.now()}`,
        title: data.title,
        message: data.message,
        createdAt: new Date().toISOString(),
      };
      mockAnnouncements.push(newAnnouncement);
      resolve(newAnnouncement);
    }, 500);
  });
};
