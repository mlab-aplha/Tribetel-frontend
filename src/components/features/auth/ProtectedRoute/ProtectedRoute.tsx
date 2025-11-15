import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import Loader from '@components/common/Loader/Loader';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    adminOnly?: boolean;
    customerOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAuth = true,
    adminOnly = false,
    customerOnly = false
}) => {
    const { user, isLoading, isAdmin } = useAuth();

    if (isLoading) {
        return <Loader text="Loading..." fullscreen />;
    }

    if (adminOnly) {
        if (!user || !isAdmin) {
            return <Navigate to="/admin/signin" replace />;
        }
        return <>{children}</>;
    }

    if (customerOnly) {
        if (!user) {
            return <Navigate to="/login" replace />;
        }
        if (isAdmin) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <>{children}</>;
    }
    if (requireAuth && !user) {
        return <Navigate to="/login" replace />;
    }
    if (!requireAuth && user) {
        if (isAdmin) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

