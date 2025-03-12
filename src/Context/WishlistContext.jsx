import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const [wishlistData, setWishlistData] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Helper function to safely get the token
    const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : "");

    // Function to add an item to the wishlist
    async function addWishlistItem(productId) {
        try {
            const token = getToken();
            if (!token) throw new Error("User not authenticated");

            const res = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId },
                { headers: { token } }
            );

            if (res.data.status === "success") {
                toast.success(res.data.message, { duration: 1500 });
                setWishlistCount(res.data.count); // Fixed: Using correct response data
            }
        } catch (err) {
            console.error("Error adding to wishlist:", err);
        }
    }

    // Function to fetch the wishlist
    async function displayWishlist() {
        setLoading(true);
        try {
            const token = getToken();
            if (!token) return;

            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token },
            });

            setWishlistCount(data.count || 0);
            setWishlistData(data.data || []);
        } catch (err) {
            console.error("Error fetching wishlist:", err);
        } finally {
            setLoading(false);
        }
    }

    // Function to remove an item from the wishlist
    async function deleteWishlistItem(id) {
        try {
            const token = getToken();
            if (!token) return;

            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: { token },
            });

            setWishlistData((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
            setWishlistCount(data.count || 0);
            console.log(data);
            if (data.status === "success") {
                toast.error(data.message, { duration: 1500 });
                setWishlistCount(data.count); // Fixed: Using correct response data
            }
            
        } catch (err) {
            console.error("Error removing item from wishlist:", err);
        }
    }

    return (
        <WishlistContext.Provider
            value={{
                addWishlistItem,
                displayWishlist,
                wishlistCount,
                wishlistData,
                deleteWishlistItem,
                loading,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}
