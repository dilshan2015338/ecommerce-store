import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const { register, loading, error, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleRegister = async (userData) => {
        const result = await register(userData);
        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <span className="text-4xl block mb-2">✨</span>
                    <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 text-sm">Join our shopping community</p>
                </div>

                <RegisterForm
                    onSubmit={handleRegister}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default RegisterPage;