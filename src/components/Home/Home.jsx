import axios from "axios";
import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { DotLoader } from "react-spinners";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import Slider1 from '../../assets/Images/slider-image-1.jpeg'
import Slider2 from '../../assets/Images/slider-image-2.jpeg'
import Slider3 from '../../assets/Images/slider-image-3.jpeg'
import useCategories from "../../Hooks/useCategories";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products from API
  async function allProducts() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return response.data;

  }

  // Fetching data using React Query
  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: allProducts,
  });

  const { allCat, catLoading } = useCategories()
  // Extract products array
  const products = data?.data || [];
  const categories = allCat?.data.data || [];


  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Slider Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:gap-x-2 max-w-4xl md:max-w-6xl mx-4 md:mx-auto my-6">
        <div className="sm:col-span-4 md:col-span-4 sm:px-4">
          <Swiper slidesPerView={1} modules={[Autoplay]} loop autoplay={{ delay: 7000 }} pagination={{ clickable: true }}>
            <SwiperSlide>
              <img src={Slider1} alt="HomePage Slider" className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover md:shadow-lg rounded-2xl md:rounded-none" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Slider2} alt="HomePage Slider" className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover md:shadow-lg rounded-2xl md:rounded-none" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Slider3} alt="HomePage Slider" className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover md:shadow-lg rounded-2xl md:rounded-none" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="hidden md:flex md:col-span-2 flex-col gap-y-2">
          <img src={Slider3} alt="HomePage Slider" className="w-full h-[190px] sm:h-[172px] md:h-[195px] object-cover shadow-lg rounded-lg" />
          <img src={Slider2} alt="HomePage Slider" className="w-full h-[190px] sm:h-[172px] md:h-[195px] object-cover shadow-lg rounded-lg" />
        </div>
      </div>

      {/* Slider Section */}



      {/* slider Categories */}
      <Swiper
        slidesPerView={3} // Default for small screens
        loop={categories.length > 5}
        modules={[Autoplay]}
        spaceBetween={10}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 4 }, // Medium screens (md)
          1024: { slidesPerView: 5 }, // Large screens (lg)
          1280: { slidesPerView: 6 }, // Extra large screens
        }}
        className="my-3"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <img src={cat.image} className="h-[200px] w-full rounded-lg" alt={cat.name} />
            <h3 className="text-center dark:text-white">{cat.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* slider Categories */}

      <div className="container mx-auto px-6"> {/* Added px-6 for horizontal padding */}
        {/* Loading State */}
        {isLoading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <DotLoader color="#0AAD0A" />
          </div>
        ) : (
          <div className="p-8">
            {/* Search Bar */}
            <div className="flex justify-center mb-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full max-w-4xl p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">

              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="text-center text-6xl text-gray-500 col-span-full dark:text-white">No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>

  );
};

export default Home;
