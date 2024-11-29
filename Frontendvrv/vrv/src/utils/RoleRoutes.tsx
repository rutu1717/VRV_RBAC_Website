import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleRouteProps {
    component: React.ComponentType;  // Define component as React.ComponentType
    children?: React.ReactNode;
}

export const AdminRoute: React.FC<RoleRouteProps> = ({ component: Component }) => {

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');   
    console.log("Current Auth State:", {
        hasUser: !!user,
        hasToken: !!token,
        userData: user,
        currentPath: window.location.pathname
    });
    
    if (!user || !token) {
        console.log("Authentication missing:", { user, token });
        return <Navigate to="/auth/login" />;
    }
    
    console.log("User role check:", {
        currentRole: user.role,
        isAdmin: user.role === 'admin'
    });
    
    if (user.role !== 'admin') {
        console.log("Access denied: User is not admin");
        return <Navigate to="/" />;
    }

    console.log("Access granted: Rendering admin component");
    return <Component />;
};

export const ModeratorRoute: React.FC<RoleRouteProps> = ({ component: Component, children }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    return user && (user.role === 'moderator'|| user.role === 'admin') ? (
        Component ? <Component /> : <>{children}</>
    ) : <Navigate to="/" />;
};

export default {
    AdminRoute,
    ModeratorRoute,
};