import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { login, loading, error, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (email, password) => {
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <span className="text-4xl block mb-2">🔐</span>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Login to your account</p>
                </div>

                <LoginForm
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default LoginPage;