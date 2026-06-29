import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-gray-500">Please login to view your profile</p>
                <Link to="/login" className="btn-primary inline-block mt-4">
                    Login
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="card">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            {user.fullName?.charAt(0) || user.username?.charAt(0) || 'U'}
                        </div>
                        <h1 className="text-2xl font-bold">{user.fullName || user.username}</h1>
                        <p className="text-gray-500">{user.email}</p>
                    </div>

                    <div className="border-t mt-6 pt-6">
                        <h2 className="font-semibold mb-4">Account Details</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Username</span>
                                <span>{user.username}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Email</span>
                                <span>{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Full Name</span>
                                <span>{user.fullName}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t mt-6 pt-6">
                        <button
                            onClick={logout}
                            className="btn-danger w-full"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;