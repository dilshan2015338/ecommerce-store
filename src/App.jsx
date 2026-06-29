import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartSidebar from "./components/cart/CartSidebar.jsx";
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {ProductProvider} from "./context/ProductContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <ProductProvider>
                        <div className="min-h-screen bg-gray-50 flex flex-col">
                            <Navbar setIsCartOpen={setIsCartOpen}/>
                            <main className="flex flex-col flex-1 ">
                                <div className={isCartOpen ? "opacity-50" : ""}>
                                    <Routes>
                                        <Route path="/" element={<HomePage/>}/>
                                        <Route path="/products" element={<ProductsPage/>}/>
                                        <Route path="/product/:id" element={<ProductDetailPage/>}/>
                                        <Route path="/checkout" element={<CheckoutPage/>}/>
                                        <Route path="/order-confirmation" element={<OrderConfirmationPage/>}/>
                                        <Route path="/profile" element={
                                            <ProtectedRoute>
                                                <ProfilePage />
                                            </ProtectedRoute>
                                        } />
                                        {/* More routes will be added */}

                                        <Route path="/login" element={<LoginPage/>}/>
                                        <Route path="/register" element={<RegisterPage/>}/>
                                    </Routes>
                                </div>
                                <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>
                            </main>
                            <Footer/>
                        </div>
                    </ProductProvider>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;