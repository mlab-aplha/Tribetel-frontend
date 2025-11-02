import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpLayout from '../../components/layout/SignUpLayout/SignUpLayout';
import SignUpForm from '../../components/features/auth/SignUpForm/SignUpForm';
import ProtectedRoute from '../../components/features/auth/ProtectedRoute/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader/Loader';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <Loader text="Loading..." fullscreen />;
    }

    // If user is already authenticated, redirect to home
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