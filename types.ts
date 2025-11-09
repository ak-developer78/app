// Fix: Populate the types.ts file with all necessary type definitions.
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePhotoUrl: string;
  department: string;
  year: string;
  // New fields for a more "real" profile
  major?: string;
  gpa?: number;
  advisor?: string;
  expectedGraduation?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
}

export interface Grade {
  courseName: string;
  grade: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  courseName: string;
  date: string;
  time: string;
  location: string;
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  title: string;
  email: string;
  imageUrl: string;
}

export interface CampusEvent {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

export interface PortalActivity {
    id: string;
    type: 'NEW_STUDENT' | 'NEW_COURSE' | 'NEW_ANNOUNCEMENT';
    description: string;
    timestamp: string;
}

export interface Notification {
    id: string;
    message: string;
    read: boolean;
    createdAt: string;
}