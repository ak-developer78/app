import { Exam, Faculty, CampusEvent } from '../types';

const mockExams: Exam[] = [
    { id: 'exm-1', courseName: 'Introduction to Computer Science', date: '2024-12-15', time: '09:00 AM', location: 'Hall A' },
    { id: 'exm-2', courseName: 'Classical Mechanics', date: '2024-12-16', time: '01:00 PM', location: 'Hall B' },
    { id: 'exm-3', courseName: 'World History: Ancient Civilizations', date: '2024-12-17', time: '09:00 AM', location: 'Room 201' },
    { id: 'exm-4', courseName: 'Calculus III', date: '2024-12-18', time: '01:00 PM', location: 'Hall A' },
    { id: 'exm-5', courseName: 'English Composition', date: '2024-12-19', time: '09:00 AM', location: 'Room 305' },
    { id: 'exm-6', courseName: 'Principles of Biology', date: '2024-12-20', time: '01:00 PM', location: 'Hall C' },
    { id: 'exm-7', courseName: 'Introduction to Psychology', date: '2024-12-15', time: '01:00 PM', location: 'Room 110' },
    { id: 'exm-8', courseName: 'Linear Algebra', date: '2024-12-16', time: '09:00 AM', location: 'Hall B' },
    { id: 'exm-9', courseName: 'Organic Chemistry', date: '2024-12-17', time: '01:00 PM', location: 'Lab 404' },
    { id: 'exm-10', courseName: 'Microeconomics', date: '2024-12-18', time: '09:00 AM', location: 'Room 202' },
    { id: 'exm-11', courseName: 'Data Structures and Algorithms', date: '2024-12-19', time: '01:00 PM', location: 'Hall A' },
    { id: 'exm-12', courseName: 'Art History: Renaissance to Modern', date: '2024-12-20', time: '09:00 AM', location: 'Room 101' },
    { id: 'exm-13', courseName: 'Introduction to Sociology', date: '2024-12-15', time: '04:00 PM', location: 'Room 301' },
    { id: 'exm-14', courseName: 'Public Speaking', date: '2024-12-16', time: '04:00 PM', location: 'Auditorium' },
    { id: 'exm-15', courseName: 'Introduction to Philosophy', date: '2024-12-17', time: '04:00 PM', location: 'Room 205' },
    { id: 'exm-16', courseName: 'General Physics I', date: '2024-12-18', time: '04:00 PM', location: 'Hall C' },
];

const mockFaculty: Faculty[] = [
    { id: 'fac-1', name: 'Dr. Alan Turing', department: 'Computer Science', title: 'Professor', email: 'a.turing@college.edu', imageUrl: 'https://i.pravatar.cc/150?u=alan-turing' },
    { id: 'fac-2', name: 'Dr. Marie Curie', department: 'Physics', title: 'Professor', email: 'm.curie@college.edu', imageUrl: 'https://i.pravatar.cc/150?u=marie-curie' },
    { id: 'fac-3', name: 'Dr. Ada Lovelace', department: 'Computer Science', title: 'Associate Professor', email: 'a.lovelace@college.edu', imageUrl: 'https://i.pravatar.cc/150?u=ada-lovelace' },
    { id: 'fac-4', name: 'Dr. Isaac Newton', department: 'Mathematics', title: 'Department Head', email: 'i.newton@college.edu', imageUrl: 'https://i.pravatar.cc/150?u=isaac-newton' },
];

const mockCampusEvents: CampusEvent[] = [
    { id: 'evt-1', title: 'Guest Lecture: The Future of AI', date: '2024-11-20', location: 'Main Auditorium', description: 'Join us for an insightful talk by Dr. Evelyn Reed.' },
    { id: 'evt-2', title: 'Fall Career Fair', date: '2024-11-25', location: 'Student Union', description: 'Meet with top employers from various industries.' },
    { id: 'evt-3', title: 'Charity Bake Sale', date: '2024-11-28', location: 'Campus Quad', description: 'Support a good cause and enjoy delicious treats.' },
    { id: 'evt-4', title: 'Inter-Departmental Soccer Match', date: '2024-12-02', location: 'Sports Complex', description: 'Cheer for your department\'s team!' },
];

export const getExams = (): Promise<Exam[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockExams), 500);
    });
};

export const getFaculty = (): Promise<Faculty[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockFaculty), 500);
    });
};

export const getCampusEvents = (): Promise<CampusEvent[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockCampusEvents), 700);
    });
};