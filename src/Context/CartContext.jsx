import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cartId, setCartId] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [numCartItems, setNumCartItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    // Helper function to safely get token
    const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : "");

    // Function to add item to cart
    async function addCartItem(productId) {
        setIsAddingToCart(true);
        try {
            const token = getToken();
            if (!token) throw new Error("User not authenticated");

            const res = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId },
                { headers: { token } }
            );

            if (res.data.status === "success") {
                setNumCartItems(res?.data.numOfCartItems);
                toast.success(res.data.message, { duration: 1500 });
            }
        } catch (err) {
            console.error("Error adding item to cart:", err);
            toast.error("This didn't work.");
        } finally {
            setIsAddingToCart(false);
        }
    }

    // Function to fetch cart items
    async function getCartItems() {
        setLoading(true);
        try {
            const token = getToken();
            if (!token) return;

            const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token },
            });

            setCartId(res.data.cartId);
            setNumCartItems(res?.data.numOfCartItems || 0);
            setTotalPrice(res?.data.data.totalCartPrice || 0);
            setCartData(res?.data.data.products || []);
        } catch (error) {
            console.error("Error fetching cart products:", error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch cart items on mount
    useEffect(() => {
        getCartItems();
    }, []);

    // Function to update cart item quantity
    async function updateCart(id, count) {
        try {
            const token = getToken();
            if (!token) return;

            const res = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { count },
                { headers: { token } }
            );

            setCartData(res?.data.data.products);
            setNumCartItems(res?.data.numOfCartItems || 0);
            setTotalPrice(res?.data.data.totalCartPrice || 0);
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    }

    // Function to delete a single cart item
    async function deleteCartItem(id) {
        try {
            const token = getToken();
            if (!token) return;

            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: { token },
            });

            setCartData(res?.data.data.products || []);
            setNumCartItems(res?.data.numOfCartItems || 0);
            setTotalPrice(res?.data.data.totalCartPrice || 0);
        } catch (err) {
            console.error("Error deleting cart item:", err);
        }
    }

    // Function to clear cart locally
    function clearCart() {
        setCartData([]);
        setNumCartItems(0);
        setTotalPrice(0);
    }

    // Function to delete all cart items from backend
    async function deleteAllCart() {
        try {
            const token = getToken();
            if (!token) return;

            const res = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token },
            });

            setCartData([]);
            setTotalPrice(0);
            setNumCartItems(0);
            toast.success("Cart cleared successfully!");
        } catch (err) {
            console.error("Error clearing cart:", err);
            toast.error("Failed to clear cart");
        }
    }

    return (
        <CartContext.Provider
            value={{
                addCartItem,
                isAddingToCart,
                getCartItems,
                clearCart,
                cartData,
                numCartItems,
                setNumCartItems,
                setCartData,
                setTotalPrice,
                loading,
                updateCart,
                deleteCartItem,
                deleteAllCart,
                totalPrice,
                cartId,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
