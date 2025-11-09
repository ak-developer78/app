import { PortalActivity } from '../types';

const mockActivities: PortalActivity[] = [
    { id: 'act-1', type: 'NEW_ANNOUNCEMENT', description: 'Admin posted "Final Exam Schedule Published"', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: 'act-2', type: 'NEW_STUDENT', description: 'Peter Jones registered as a new student.', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    { id: 'act-3', type: 'NEW_COURSE', description: 'A new course "Principles of Biology" was added.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { id: 'act-4', type: 'NEW_STUDENT', description: 'Jane Smith registered as a new student.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'act-5', type: 'NEW_ANNOUNCEMENT', description: 'Admin posted "Library Holiday Hours"', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
];

export const getPortalActivity = (): Promise<PortalActivity[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockActivities), 900);
    });
};
