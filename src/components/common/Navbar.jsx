import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useCartContext} from '../../context/CartContext';
import {useAuth} from "../../context/AuthContext.jsx";

const Navbar = ({ setIsCartOpen }) => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {cart} = useCartContext();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        {/*<span className="text-2xl">🛒</span>*/}
                        <span className="text-xl font-bold text-blue-600">ShopHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Home</Link>
                        <Link to="/products" className="text-gray-600 hover:text-blue-600 transition">Products</Link>
                        <Link to="/about" className="text-gray-600 hover:text-blue-600 transition">About</Link>
                    </div>

                    {/* Cart & Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 hover:bg-gray-100 rounded-full transition"
                        >
                            <span className="text-2xl">🛒</span>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cart.itemCount}
                            </span>
                        </button>
                        {/*<button className="hidden md:block btn-primary text-sm px-4 py-2">*/}
                        {/*    Login*/}
                        {/*</button>*/}
                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    <Link to="/profile" className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                          {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                          {user?.fullName?.split(' ')[0] || user?.username}
                                        </span>
                                    </Link>
                                    {/*<button*/}
                                    {/*    onClick={logout}*/}
                                    {/*    className="text-sm text-gray-500 hover:text-red-500 transition"*/}
                                    {/*>*/}
                                    {/*    Logout*/}
                                    {/*</button>*/}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to="/login" className="btn-secondary text-sm px-4 py-2">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn-primary text-sm px-4 py-2">
                                        Register
                                    </Link>
                                </div>
                            )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <span className="text-2xl">☰</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col gap-3">
                            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                            <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
                            <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
                            <button className="btn-primary w-full">Login</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;