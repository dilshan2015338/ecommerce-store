import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData.email, formData.password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="john@example.com"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your password"
                    required
                />
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;