import React, { useEffect, useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { DotLoader } from "react-spinners";

export default function Wishlist() {
    const { displayWishlist, wishlistData, deleteWishlistItem, loading } = useContext(WishlistContext);
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

    return (
        <>
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center bg-white dark:bg-gray-900">
            <DotLoader color="#0AAD0A" />
          </div>
        ) : (
          <div className="container mx-auto py-3 px-4 sm:px-6 bg-transparent">
            {!wishlistData?.length ? (
              <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
                Your wishlist is empty.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistData.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden relative group min-h-[450px] pb-20"
                  >
                    {/* Product Image */}
                    <Link to={`/details/${item._id}`} className="w-full">
                      <img
                        className="w-full h-auto max-h-[250px] sm:max-h-[300px] object-contain bg-white dark:bg-gray-800"
                        src={item.imageCover}
                        alt={item.title}
                      />
                    </Link>
      
                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm text-[#4fa74f] dark:text-[#5cc75c] font-semibold">
                          {item.category?.name || "No Category"}
                        </h5>
                        <button
                          onClick={() => deleteWishlistItem(item._id)}
                          className="text-3xl text-red-500 dark:text-red-400 transition-all duration-300 hover:text-red-700 dark:hover:text-red-500"
                        >
                          ♥
                        </button>
                      </div>
      
                      {/* Product Title */}
                      <Link to={`/details/${item._id}`}>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {item.title}
                        </h2>
                      </Link>
      
                      {/* Price & Ratings */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                          £E {item.price}
                        </span>
                        <div className="flex items-center">{renderStars(item.ratingsAverage)}</div>
                      </div>
                    </div>
      
                    {/* Add to Cart Button */}
                    <div className="absolute bottom-[-50px] left-0 w-full flex justify-center group-hover:bottom-4 transition-all duration-300">
                      <button
                        onClick={() => addCartItem(item._id)}
                        className="w-3/4 cursor-pointer text-white bg-[#4fa74f] hover:bg-[#479647] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-500 font-medium rounded-lg text-lg px-4 py-2"
                        disabled={isAddingToCart}
                      >
                        {isAddingToCart ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </>
    );
}
