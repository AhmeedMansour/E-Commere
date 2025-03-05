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
    <div className="container mx-auto py-3 px-6">
      <div className="grid grid-cols-12 gap-x-3 gap-y-6">
        {brandsData.map((item) => (
          <div key={item._id} className="col-span-2">
              <Link to={`/brandsdetails/${item._id}`}>
            <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm group overflow-hidden">
              {/* Image */}
            
              <img
                className="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                src={item.image}
                alt={item.name}
              />

              {/* Brand Name Overlay */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:bg-[rgba(0,0,0,0.5)] transition-opacity duration-300">
                <span className="text-white text-2xl font-semibold opacity-0 group-hover:opacity-100">
                  {item.name}
                </span>
              </div>

         
            </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}