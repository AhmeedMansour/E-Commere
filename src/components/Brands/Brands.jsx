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
    <div className="container mx-auto py-4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {brandsData.map((item) => (
          <Link key={item._id} to={`/brandsdetails/${item._id}`}>
            <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm group overflow-hidden">
              {/* Image */}
              <img
                className="rounded-lg w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                src={item.image}
                alt={item.name}
              />

              {/* Brand Name Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-2xl font-semibold">
                  {item.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
