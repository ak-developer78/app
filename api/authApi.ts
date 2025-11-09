// Fix: Create the mock authentication API to resolve module import errors.
import { User, UserRole } from '../types';

// Simple in-memory "database" for users
class MockUserDB {
    private users: User[];

    constructor() {
        this.users = [
            {
                id: 'admin-1',
                name: 'Admin User',
                email: 'admin@college.edu',
                role: UserRole.ADMIN,
                profilePhotoUrl: 'https://i.pravatar.cc/150?u=admin-1',
                department: 'Administration',
                year: 'N/A',
                major: 'Portal Administration',
                gpa: 4.0,
                advisor: 'System',
                expectedGraduation: 'N/A',
                phone: '111-222-3333',
                address: '123 Admin Lane',
                bio: 'Responsible for the maintenance and administration of the College Portal.'
            },
            {
                id: 'student-1',
                name: 'Alice Johnson',
                email: 'alice@college.edu',
                role: UserRole.STUDENT,
                profilePhotoUrl: 'https://i.pravatar.cc/150?u=student-1',
                department: 'Computer Science',
                year: '3',
                major: 'Software Engineering',
                gpa: 3.8,
                advisor: 'Dr. Alan Turing',
                expectedGraduation: 'May 2025',
                phone: '123-456-7890',
                address: '456 Student Dr, Apt 3B',
                bio: 'Passionate about AI and web development. Member of the coding club and a coffee enthusiast.'
            },
            {
                id: 'student-2',
                name: 'Bob Williams',
                email: 'bob@college.edu',
                role: UserRole.STUDENT,
                profilePhotoUrl: 'https://i.pravatar.cc/150?u=student-2',
                department: 'Physics',
                year: '4',
                major: 'Astrophysics',
                gpa: 3.5,
                advisor: 'Dr. Marie Curie',
                expectedGraduation: 'May 2024',
                phone: '987-654-3210',
                address: '789 Scholar Ave',
                bio: 'Exploring the cosmos, one equation at a time. President of the Astronomy Club.'
            },
        ];
    }

    find(predicate: (user: User) => boolean): User | undefined {
        return this.users.find(predicate);
    }

    findIndex(predicate: (user: User) => boolean): number {
        return this.users.findIndex(predicate);
    }
    
    getUser(index: number): User {
        return this.users[index];
    }

    setUser(index: number, user: User): void {
        this.users[index] = user;
    }

    add(user: User): void {
        this.users.push(user);
    }

    getAll(): User[] {
        return [...this.users];
    }
}

export const mockUserDB = new MockUserDB();

export interface LoginCredentials {
  email: string;
  password: string; // Password isn't checked in this mock
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  department: string;
  year: string;
}

export const login = (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUserDB.find(u => u.email === credentials.email);
      if (user) {
        // In a real app, you'd verify the password here.
        resolve({
          token: `mock-token-for-${user.id}`,
          user,
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

export const register = (data: RegisterData): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUserDB.find(u => u.email === data.email)) {
        reject(new Error('User with this email already exists'));
        return;
      }
      const newUserId = `student-${Date.now()}`;
      const newUser: User = {
        id: newUserId,
        name: data.name,
        email: data.email,
        role: UserRole.STUDENT, // All new registrations are students
        profilePhotoUrl: `https://i.pravatar.cc/150?u=${newUserId}`,
        department: data.department,
        year: data.year,
        major: 'Undeclared',
        gpa: 0.0,
        advisor: 'Not Assigned',
        expectedGraduation: 'TBD',
        phone: '',
        address: '',
        bio: ''
      };
      mockUserDB.add(newUser);
      resolve(newUser);
    }, 1000);
  });
};