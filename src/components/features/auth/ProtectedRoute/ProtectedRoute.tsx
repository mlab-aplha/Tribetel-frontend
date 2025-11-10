import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProtectedRouteProps } from '../../../types/common';
import Loader from '../../../common/Loader/Loader';
import { useAuth } from '../../../../hooks/useAuth';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAuth = false,
    requireAdmin = false,
    redirectTo = '/signin',
    fallback = <Loader text="Checking authentication..." fullscreen />
}) => {
    const { isLoading, isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <>{fallback}</>;
    }

    if (requireAuth && !isAuthenticated) {
        return (
            <Navigate
                to={redirectTo}
                state={{ from: location }}
                replace
            />
        );
    }

    if (requireAdmin && !isAdmin) {
        console.warn('Admin access required. Redirecting to home.');
        return (
            <Navigate
                to="/"
                state={{ from: location }}
                replace
            />
        );
    }

    if (!requireAuth && isAuthenticated && (location.pathname === '/signin' || location.pathname === '/signup')) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    if (!requireAdmin && isAdmin && location.pathname === '/admin/signin') {
        return (
            <Navigate
                to="/admin/dashboard"
                replace
            />
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;