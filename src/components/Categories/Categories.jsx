import React from 'react';
import useCategories from '../../Hooks/useCategories';
import { Link } from 'react-router-dom';
import { DotLoader } from 'react-spinners';

const Categories = () => {
  const { allCat, catLoading } = useCategories();
  const categories = allCat?.data.data || [];

  return (
    <div className="container mx-auto max-w-7xl py-4 px-4">
      {catLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <DotLoader color="#0AAD0A" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              to={"/categories"}
              key={cat._id}
              className="relative group overflow-hidden rounded-xl"
            >
              <img
                src={cat.image}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] rounded-xl object-contain"
                alt={cat.name}
              />
              {/* Overlay div */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-400"></div>
              <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                        text-white text-xl font-semibold px-4 py-2 rounded-lg text-center 
                        opacity-0 group-hover:opacity-100 transition duration-300">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
