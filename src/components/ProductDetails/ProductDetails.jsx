import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";  
import { FaStar, FaRegStar } from "react-icons/fa";  
import { DotLoader } from "react-spinners";  
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';

export default function ProductDetails() {

   const { addCartItem,isAddingToCart } = useContext(CartContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  const params = useParams();


 

  async function getSpecificProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${params.id}`);
      setData(data?.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSpecificProduct();
  }, [params.id]);

  const renderStars = () => {
    if (!data) return null;
    return Array.from({ length: 5 }).map((_, index) => (
      index < Math.round(data?.ratingsAverage) ? 
      <FaStar key={index} className="text-yellow-400 w-5 h-5" /> : 
      <FaRegStar key={index} className="text-gray-400 w-5 h-5" />
    ));
  };

  // Updated Loading State
  if (loading) return (
    <div className="w-full h-screen flex justify-center items-center">
      <DotLoader color="#0AAD0A" />
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg p-6">
        
        <div className="flex justify-center">
          <img 
            src={data?.imageCover} 
            className="w-full max-w-md h-auto rounded-lg shadow-md object-cover"
            alt={data?.title} 
          />
        </div>

        <div className="flex flex-col justify-between">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {data?.category?.name}
          </p>

          <h1 className="text-3xl font-semibold text-gray-800">
            {data?.title}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {data?.description}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-bold text-green-600">
              £E {data?.price}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars()} 
              <span className="text-gray-600 ml-1">({data?.ratingsAverage})</span>
            </div>
          </div>

          <button
    onClick={()=>addCartItem(data._id)}
    disabled={isAddingToCart} // Disable button while adding
    className="mt-6 flex cursor-pointer items-center justify-center gap-2 w-full bg-green-600 text-white py-3 text-lg font-medium rounded-lg shadow-md hover:bg-green-700 transition-all"
>
    <AiOutlineShoppingCart className="text-2xl" />
    {isAddingToCart ? "Adding..." : "Add to Cart"} {/* Show text conditionally */}
</button>
        </div>
      </div>
    </div>
  );
}
