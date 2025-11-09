// Fix: Create the mock course API to resolve module import errors.
import { Course } from '../types';

const mockCourses: Course[] = [
  {
    id: 'cs101',
    name: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of programming using Python, including data structures, algorithms, and object-oriented principles.',
    credits: 3,
  },
  {
    id: 'phy201',
    name: 'Classical Mechanics',
    description: 'A comprehensive study of Newtonian mechanics, covering kinematics, dynamics, energy, momentum, and rotational motion.',
    credits: 4,
  },
  {
    id: 'his102',
    name: 'World History: Ancient Civilizations',
    description: 'Explore the history of ancient civilizations from Mesopotamia and Egypt to Greece and Rome.',
    credits: 3,
  },
  {
    id: 'mat203',
    name: 'Calculus III',
    description: 'An advanced study of multivariable calculus, including partial derivatives, multiple integrals, and vector calculus.',
    credits: 4,
  },
  {
    id: 'eng101',
    name: 'English Composition',
    description: 'Develop skills in critical reading, writing, and argumentation through analysis of various texts.',
    credits: 3,
  },
  {
    id: 'bio101',
    name: 'Principles of Biology',
    description: 'An introduction to the fundamental principles of biology, including cell biology, genetics, evolution, and ecology.',
    credits: 4,
  },
];

// Mock which courses each student is enrolled in
const studentEnrollments: { [studentId: string]: string[] } = {
    'student-1': ['cs101', 'mat203', 'eng101'],
    'student-2': ['phy201', 'mat203'],
};


export const getCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses);
    }, 500);
  });
};

export const getEnrolledCourses = (studentId: string): Promise<Course[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const courseIds = studentEnrollments[studentId] || [];
            const courses = mockCourses.filter(c => courseIds.includes(c.id));
            resolve(courses);
        }, 300);
    });
};