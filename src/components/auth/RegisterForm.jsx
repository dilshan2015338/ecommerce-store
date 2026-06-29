import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        // Clear password error when typing
        if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
            setPasswordError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        // Remove confirmPassword before sending
        const { confirmPassword, ...userData } = formData;
        onSubmit(userData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="John Doe"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="john_doe"
                    required
                />
            </div>

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
                    placeholder="Min 6 characters"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Confirm your password"
                    required
                />
            </div>

            {(error || passwordError) && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error || passwordError}
                </div>
            )}

            <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Login here
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;