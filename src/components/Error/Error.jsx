import React from 'react';
import error from '../../assets/Images/error.svg';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="text-center p-8 max-w-lg shadow-2xl bg-white dark:bg-gray-800 rounded-xl">
        <img
          src={error}
          alt="Error Illustration"
          className="max-w-lg w-full h-auto mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
          The page you're looking for doesn't exist. Try refreshing or return to the Home Page.
        </p>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default Error;