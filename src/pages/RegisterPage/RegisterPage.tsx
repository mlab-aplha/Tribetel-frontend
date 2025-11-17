import React from 'react';
import { Navigate } from 'react-router-dom';
import SignUpLayout from '../../components/features/auth/SignUp/SignUpLayout';
import SignUpForm from '../../components/features/auth/SignUp/SignUpForm';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader/Loader';

const RegisterPage: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Loader text="Loading..." fullscreen />;
    }
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <SignUpLayout>
            <SignUpForm />
        </SignUpLayout>
    );
};

export default RegisterPage;
