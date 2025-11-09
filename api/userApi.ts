import { User } from '../types';
import { mockUserDB } from './authApi'; // Use the same mock user "database"

// This is a mock function. In a real app, you'd get the current user based on the auth token.
export const getMe = (): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // For mock purposes, let's derive the user from the token.
            const token = localStorage.getItem('token');
            if (token && token.startsWith('mock-token-for-')) {
                const userId = token.replace('mock-token-for-', '');
                const user = mockUserDB.find(u => u.id === userId);
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error("User for token not found"));
                }
            }
             else {
                reject(new Error("No valid session found"));
            }
        }, 500);
    });
};

export const getAllUsers = (): Promise<User[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUserDB.getAll());
        }, 500);
    });
};


export const updateUser = (userId: string, data: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = mockUserDB.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                // Make sure not to overwrite with undefined if a field is not present in data
                const currentUser = mockUserDB.getUser(userIndex);
                const updatedUser = { ...currentUser, ...data };
                mockUserDB.setUser(userIndex, updatedUser);
                resolve(updatedUser);
            } else {
                reject(new Error("User not found"));
            }
        }, 500);
    });
};