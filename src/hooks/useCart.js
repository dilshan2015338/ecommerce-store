import { useState, useEffect, useCallback } from 'react';
import { cartApi } from '../services/api';

export const useCart = () => {
    const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const loadCart = async () => {
        try {
            setLoading(true);
            const data = await cartApi.getCart(token);
            setCart(data);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = useCallback(async (productId, quantity = 1) => {
        try {
            const updatedCart = await cartApi.addItem(productId, quantity, token);
            setCart(updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }, []);

    const updateQuantity = useCallback(async (productId, quantity) => {
        try {
            const updatedCart = await cartApi.updateItem(productId, quantity, token);
            setCart(updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
    }, []);

    const removeFromCart = useCallback(async (productId) => {
        try {
            await cartApi.removeItem(productId, token);
            await loadCart(); // Reload cart
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    }, []);

    const clearCart = useCallback(async () => {
        try {
            await cartApi.clearCart();
            setCart({ items: [], total: 0, itemCount: 0 });
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }, []);

    useEffect(() => {
        loadCart();
    }, [token]);

    return { cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, loadCart };
};