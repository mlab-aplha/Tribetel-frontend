import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>; // alias for signIn
  signup: (email: string, password: string, fullName: string) => Promise<void>; // alias for signUp
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication for frontend
  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser({
        id: '1',
        email: 'demo@hotel.com',
        full_name: 'Demo User',
        role: 'admin'
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, _password: string) => {
    setIsLoading(true);
    // Mock sign in
    setTimeout(() => {
      setUser({
        id: '1',
        email: email,
        full_name: 'Demo User',
        role: 'admin'
      });
      setIsLoading(false);
    }, 1000);
  };

  const signUp = async (email: string, _password: string, fullName: string) => {
    setIsLoading(true);
    // Mock sign up
    setTimeout(() => {
      setUser({
        id: '1',
        email: email,
        full_name: fullName,
        role: 'user'
      });
      setIsLoading(false);
    }, 1000);
  };

  const signOut = async () => {
    setUser(null);
  };

  // Aliases for components that use different method names
  const login = signIn;
  const signup = signUp;
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    login,
    signup,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


