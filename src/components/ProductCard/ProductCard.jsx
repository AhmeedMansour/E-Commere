import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductCard({ product }) {
    const { addCartItem, isAddingToCart } = useContext(CartContext);
    const { addWishlistItem, wishlistData, displayWishlist } = useContext(WishlistContext);

    const { _id, ratingsAverage, price, imageCover, title, category } = product;
    const catName = category?.name || "";

    const [isWishlisted, setIsWishlisted] = useState(false);

    // 🔹 Check localStorage first for instant response
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsWishlisted(savedWishlist.includes(_id));

        displayWishlist(); // Fetch the latest wishlist
    }, []);

    // 🔹 When wishlist updates, sync with localStorage
    useEffect(() => {
        if (wishlistData.length > 0) {
            setIsWishlisted(wishlistData.some(item => item._id === _id));
            localStorage.setItem("wishlist", JSON.stringify(wishlistData.map(item => item._id)));
        }
    }, [wishlistData, _id]);

    const handleWishlist = async () => {
        try {
            await addWishlistItem(_id);
            displayWishlist();
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Failed to add to wishlist");
        }
    };
    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < Math.round(rating) ? "text-yellow-300" : "text-gray-300"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
        ));
    };


    return (
        <div className="w-full sm:min-w-[90%] md:max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm relative group overflow-hidden pb-14 mx-auto">
            {/* Product Image with Link */}
            <Link to={`/details/${_id}`}>
                <img className="p-2 rounded-t-lg w-full h-[350px] object-contain" src={imageCover} alt={title} />
            </Link>

            {/* Product Info */}
            <div className="px-5 pb-5 flex flex-col h-full">
                <div className="flex justify-between items-center">
                    <h5 className="text-[16px] text-[#4fa74f] font-semibold">{catName}</h5>
                    <button
                        onClick={handleWishlist}
                        className={`text-3xl transition-colors duration-300 ${isWishlisted ? "text-red-500" : "text-black"}`}
                    >
                        ♥
                    </button>
                </div>

                {/* Product Title with Link */}
                <Link to={`/details/${_id}`}>
                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900">{title.split(" ").slice(0, 2).join(" ")}</h5>
                </Link>

               

                {/* Price & Ratings */}
                <div className="flex items-center justify-between mt-2.5 mb-5 min-h-[40px]">
                    <span className="text-2xl font-bold text-gray-900">£E {price}</span>
                    <div className="flex items-center space-x-1">
                        {renderStars(ratingsAverage)}
                    </div>
                </div>

            </div>

            {/* Add to Cart Button */}
            <div className="absolute bottom-[-50px] left-0 w-full flex justify-center group-hover:bottom-5 transition-all duration-300">
                <button
                    onClick={() => addCartItem(_id)}
                    className="w-3/4 cursor-pointer text-white bg-[#4fa74f] hover:bg-[#479647] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2"
                    disabled={isAddingToCart}
                >
                    {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}
