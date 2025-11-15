import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../components/types/admin';

interface AuthContextType {
    user: User | null;
    admin: boolean;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (email: string, password: string, name: string) => Promise<void>;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get initial session from Supabase
        const getInitialSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    // Fetch user profile from profiles table
                    const { data: profile, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (error) {
                        console.error('Error fetching profile:', error);
                    } else if (profile) {
                        setUser(profile);
                        // Store in localStorage for backward compatibility
                        localStorage.setItem('userData', JSON.stringify(profile));
                        localStorage.setItem('authToken', session.access_token);
                    }
                }
            } catch (error) {
                console.error('Error getting session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getInitialSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    // Fetch user profile when auth state changes
                    const { data: profile, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (error) {
                        console.error('Error fetching profile:', error);
                    } else if (profile) {
                        setUser(profile);
                        localStorage.setItem('userData', JSON.stringify(profile));
                        localStorage.setItem('authToken', session.access_token);
                    }
                } else {
                    setUser(null);
                    localStorage.removeItem('userData');
                    localStorage.removeItem('authToken');
                }
                setIsLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw new Error(error.message);
            }

            if (data.user) {
                // Fetch user profile after successful login
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.user.id)
                    .single();

                if (profileError) {
                    throw new Error(profileError.message);
                }

                if (profile) {
                    setUser(profile);
                    localStorage.setItem('userData', JSON.stringify(profile));
                    localStorage.setItem('authToken', data.session?.access_token || '');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            throw new Error(error instanceof Error ? error.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, name: string): Promise<void> => {
        setIsLoading(true);
        try {
            // First, sign up the user with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) {
                throw new Error(authError.message);
            }

            if (authData.user) {
                // Create profile in profiles table
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: authData.user.id,
                            email: email,
                            full_name: name,
                            phone: '',
                            role: 'guest', // Default role for new signups
                            avatar_url: '',
                            address: '',
                            city: '',
                            country: '',
                            is_active: true,
                        }
                    ])
                    .select()
                    .single();

                if (profileError) {
                    throw new Error(profileError.message);
                }

                if (profile) {
                    setUser(profile);
                    localStorage.setItem('userData', JSON.stringify(profile));
                    localStorage.setItem('authToken', authData.session?.access_token || '');
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            throw new Error(error instanceof Error ? error.message : 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw new Error(error.message);
            }
            setUser(null);
            localStorage.removeItem('userData');
            localStorage.removeItem('authToken');
        } catch (error) {
            console.error('Logout error:', error);
            throw new Error(error instanceof Error ? error.message : 'Logout failed');
        }
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin' || user?.role === 'manager' || user?.role === 'staff';
    const admin = isAdmin;

    const value: AuthContextType = {
        user,
        admin,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        signup,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};