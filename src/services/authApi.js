const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Request failed');
    }
    return response.json();
};

export const authApi = {
    // Register new user
    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    // Login user
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse(response);
    },

    // Get current user profile
    getProfile: async (token) => {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    },

    // Logout (optional - just clear local storage)
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};