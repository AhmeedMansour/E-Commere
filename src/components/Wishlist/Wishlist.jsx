import React, { useEffect, useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { DotLoader } from "react-spinners";

export default function Wishlist() {
    const { displayWishlist, wishlistData, deleteWishlistItem,loading } = useContext(WishlistContext);
    const { addCartItem, isAddingToCart } = useContext(CartContext);

    useEffect(() => {
        displayWishlist();
    }, []);

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

    return (<>
    
    {loading?  <div className="w-full h-screen flex justify-center items-center">
            <DotLoader color="#0AAD0A" />
          </div>:   <div className="container mx-auto py-3 px-6">
            {!wishlistData?.length ? (
                <p className="text-center text-gray-500 text-lg">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-8 gap-x-3 gap-y-6">
                    {wishlistData.map((item,index) => (
                        <div key={item._id||index} className="col-span-2">
                            <div className="w-full sm:min-w-[90%] md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm relative group overflow-hidden pb-14 mx-auto h-full flex flex-col">
                                {/* Product Image */}
                                <Link to={`/details/${item._id}`}>
                                    <img className="p-2 rounded-t-lg w-full h-[400px] object-cover" src={item.imageCover} alt={item.title} />
                                </Link>

                                {/* Product Info */}
                                <div className="px-5 pb-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center">
                                        <h5 className="text-[16px] text-[#4fa74f] font-semibold">{item.category?.name || "No Category"}</h5>
                                        <button
                                            onClick={() => deleteWishlistItem(item._id)}
                                            className="text-3xl transition-colors duration-300 text-red-500"
                                        >
                                            ♥
                                        </button>
                                    </div>

                                    {/* Product Title */}
                                    <Link to={`/details/${item._id}`}>
                                        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 line-clamp-2">{item.title.split(" ").slice(0, 2).join(" ")}</h2>
                                    </Link>

                                    {/* Price & Ratings */}
                                    <div className="flex items-center justify-between mt-2.5 mb-5 min-h-[40px]">
                                        <span className="text-2xl font-bold text-gray-900">£E {item.price}</span>
                                        <div className="flex items-center space-x-1">
                                       {renderStars(item.ratingsAverage)}
                                        </div>
                                    </div>
                                </div>

                                {/* Add to Cart Button (No onClick) */}
                                <div className="absolute bottom-[-50px] left-0 w-full flex justify-center group-hover:bottom-5 transition-all duration-300">
                <button
                    onClick={() => addCartItem(item._id)}
                    className="w-3/4 cursor-pointer text-white bg-[#4fa74f] hover:bg-[#479647] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-2"
                    disabled={isAddingToCart}
                >
                    {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
            </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>}
    
    </>

     
    );
}