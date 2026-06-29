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

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar setIsCartOpen={setIsCartOpen}/>
                <main className="flex flex-col flex-1 ">
                    <div className={isCartOpen ? "opacity-50" : ""}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                            {/* More routes will be added */}
                        </Routes>
                    </div>
                    <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;