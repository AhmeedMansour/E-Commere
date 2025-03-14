import React from 'react';
import useCategories from '../../Hooks/useCategories';
import { Link } from 'react-router-dom';
import { DotLoader } from 'react-spinners';

const Categories = () => {
  const { allCat, catLoading } = useCategories();
  const categories = allCat?.data.data || [];

  return (
    <div className="container mx-auto max-w-7xl py-6 px-4 bg-transparent transition-colors duration-300">
  {catLoading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <DotLoader color="#0AAD0A" />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <Link
          to={"/categories"}
          key={cat._id}
          className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <img
            src={cat.image}
            className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] rounded-xl object-cover transition-transform duration-400 group-hover:scale-105 bg-white dark:bg-gray-800"
            alt={cat.name}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          
          {/* Category Name */}
          <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xl font-semibold px-4 py-2 rounded-lg text-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900/60 dark:bg-gray-800/60 backdrop-blur-sm">
            {cat.name}
          </h3>

          {/* Subtle Border Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/50 rounded-xl transition-colors duration-300"></div>
        </Link>
      ))}
    </div>
  )}
</div>
  );
};

export default Categories;
