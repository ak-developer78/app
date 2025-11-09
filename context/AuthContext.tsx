import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { User } from '../types';
import { login as apiLogin, register as apiRegister, LoginCredentials, RegisterData } from '../api/authApi';
import { getMe } from '../api/userApi';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    if (token) {
      try {
        const currentUser = await getMe();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to fetch user', error);
        setToken(null);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (credentials: LoginCredentials) => {
    const { token: newToken, user: loggedInUser } = await apiLogin(credentials);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(loggedInUser);
  };

  const register = async (data: RegisterData) => {
    // Register no longer automatically logs in the user
    await apiRegister(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};