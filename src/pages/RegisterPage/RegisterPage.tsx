import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpLayout from '../../components/features/auth/SignUp/SignUpLayout';
import SignUpForm from '../../components/features/auth/SignUp/SignUpForm';
import ProtectedRoute from '../../components/features/auth/ProtectedRoute/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader/Loader';
import './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <Loader text="Loading..." fullscreen />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="register-page">
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute requireAuth={false}>
                            <SignUpLayout>
                                <SignUpForm />
                            </SignUpLayout>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/signup" replace />} />
            </Routes>
        </div>
    );
};

export default RegisterPage;