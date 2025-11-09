import { Grade } from '../types';

const mockGrades: Grade[] = [
    { courseName: 'Introduction to Computer Science', grade: 'A-', date: '2024-10-15' },
    { courseName: 'Classical Mechanics', grade: 'B+', date: '2024-10-12' },
    { courseName: 'World History: Ancient Civilizations', grade: 'A', date: '2024-10-10' },
    { courseName: 'Calculus III', grade: 'B', date: '2024-10-09' },
];

export const getRecentGrades = (): Promise<Grade[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockGrades), 800);
    });
};
