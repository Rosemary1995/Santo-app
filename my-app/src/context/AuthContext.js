import React, { createContext, useState, useEffect } from 'react';


// Create User Authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                // Validate token expiration if you have a token
                if (userData.token && isTokenExpired(userData.token)) {
                    logout();
                    return;
                }
                setUser(userData);
            }
        } catch (err) {
            setError('Error loading user data');
            console.error('Auth error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (userData) => {
        try {
            // Add token and timestamp when storing user data
            const userWithTimestamp = {
                ...userData,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('userData', JSON.stringify(userWithTimestamp));
            setUser(userWithTimestamp);
        } catch (err) {
            setError('Error during login');
            throw err;
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('userData');
            setUser(null);
            // Use navigate instead of window.location for better React integration
            // You'll need to implement this with react-router
        } catch (err) {
            setError('Error during logout');
            console.error('Logout error:', err);
        }
    };

    // Helper function to check token expiration
    const isTokenExpired = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            login, 
            logout, 
            loading, 
            error,
            isAuthenticated: !!user 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext