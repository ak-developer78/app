import { Notification } from '../types';

const mockNotifications: Notification[] = [
    { id: 'notif-1', message: 'Your library book "The Art of Computer Programming" is due tomorrow.', read: false, createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-2', message: 'A new grade has been posted for Classical Mechanics.', read: false, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-10', message: 'Event Reminder: The Fall Career Fair is tomorrow at the Student Union.', read: false, createdAt: new Date(Date.now() - 2.1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-11', message: 'A new announcement "Course Registration for Next Semester" has been posted.', read: false, createdAt: new Date(Date.now() - 2.2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-3', message: 'Reminder: Tuition payment is due next week.', read: true, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-4', message: 'Your advisor has approved your course selection for the next semester.', read: true, createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-5', message: 'Welcome back to campus! We wish you a successful semester.', read: true, createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-6', message: 'Your request to join the Coding Club has been approved.', read: true, createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-7', message: 'A new grade has been posted for English Composition.', read: true, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-8', message: 'The campus gym will be closed for maintenance this Saturday.', read: true, createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'notif-9', message: 'Financial Aid packages for the upcoming year are now available to view.', read: true, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
];

export const getNotifications = (): Promise<Notification[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())), 500);
    });
};

export const markAsRead = (notificationId: string): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const notif = mockNotifications.find(n => n.id === notificationId);
            if(notif) notif.read = true;
            resolve(true);
        }, 200);
    });
}