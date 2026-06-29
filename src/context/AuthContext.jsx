import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const userData = await authApi.getProfile(token);
                    setUser(userData);
                } catch (error) {
                    console.error('Error loading user:', error);
                    // Token might be expired
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    // Login function
    const login = async (email, password) => {
        try {
            setError(null);
            const response = await authApi.login({ email, password });

            const { token: newToken, ...userData } = response;
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));

            return { success: true, user: userData };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setError(null);
            const response = await authApi.register(userData);

            // Auto-login after registration
            const loginResult = await login(userData.email, userData.password);
            return loginResult;
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    // Logout function
    const logout = () => {
        authApi.logout();
        setUser(null);
        setToken(null);
        setError(null);
    };

    // Check if user is authenticated
    const isAuthenticated = !!user && !!token;

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            error,
            isAuthenticated,
            login,
            register,
            logout,
            setError,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};