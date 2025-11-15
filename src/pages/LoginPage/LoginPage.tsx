import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInLayout from '../../components/features/auth/SignIn/SignInLayout';
import SignInForm from '../../components/features/auth/SignIn/SignInForm';
import AdminLayout from '../../components/features/auth/AdminSignIn/AdminLayout';
import AdminSignInForm from '../../components/features/auth/AdminSignIn/AdminSignInForm';
import ProtectedRoute from '../../components/features/auth/ProtectedRoute/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader/Loader';
import './LoginPage.module.css';

const LoginPage: React.FC = () => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <Loader text="Loading..." fullscreen />;
    }

    return (
        <div className="login-page">
            <Routes>
                {/* User Sign In */}
                <Route
                    path="/signin"
                    element={
                        <ProtectedRoute requireAuth={false}>
                            <SignInLayout>
                                <SignInForm />
                            </SignInLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Admin Sign In */}
                <Route
                    path="/admin/signin"
                    element={
                        <ProtectedRoute requireAuth={false}>
                            <AdminLayout>
                                <AdminSignInForm
                                    onSubmit={handleAdminSignIn}
                                    onSuccess={handleAdminSuccess}
                                    onError={handleAdminError}
                                    allowedDomains={["@tribtel.com"]}
                                    redirectPath="/admin/dashboard"
                                />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/signin" replace />} />
                <Route path="/login" element={<Navigate to="/signin" replace />} />
                <Route path="/admin" element={<Navigate to="/admin/signin" replace />} />
            </Routes>
        </div>
    );
};

const handleAdminSignIn = async (formData: any) => {
    console.log('Admin signing in:', formData);

    if (formData.email === "admin@tribtel.com" && formData.password === "admin123") {
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminUser', JSON.stringify(formData));
        return Promise.resolve();
    } else {
        return Promise.reject(new Error("Invalid admin credentials"));
    }
};

const handleAdminSuccess = () => {
    console.log('Admin login successful');
};

const handleAdminError = (error: string) => {
    console.error('Admin login error:', error);
};

export default LoginPage;

