import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Brands() {
  const [brandsData, setBrandsData] = useState([]);

  async function displayBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrandsData(data?.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  useEffect(() => {
    displayBrands();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
    {brandsData.map((item) => (
      <Link key={item._id} to={`/brandsdetails/${item._id}`}>
        <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md group overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
          {/* Image */}
          <div className="relative w-full h-48 overflow-hidden">
            <img
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
              src={item.image}
              alt={item.name}
            />
          </div>

          {/* Brand Name Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <span className="text-white text-xl font-semibold drop-shadow-md">
              {item.name}
            </span>
          </div>

          {/* Subtle Badge (Optional) */}
          <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>
  );
}
