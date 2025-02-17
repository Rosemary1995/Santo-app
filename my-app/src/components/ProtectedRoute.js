import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}; 