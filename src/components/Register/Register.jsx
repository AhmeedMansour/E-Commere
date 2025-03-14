import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const Register = () => {
  let [errorMsg, setErrorMsg] = useState(null);
  let [sucessMsg, setSuccessMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'min 3 chars').max(20, 'max 20 chars'),
    email: yup.string().required('Email is required').email('Please enter a valid Email'),
    password: yup.string().required('Password is required').matches(/^[A-z0-9_]{6,30}$/, 'From 6 to 30 characters'),
    rePassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), 'Passwords must match']),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'Please enter a valid phone number').required('Phone Number is required'),
  });

  async function register(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      setSuccessMsg(res.data.message);
      setTimeout(() => { navigate('/login'); }, 1500);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: register,
    validationSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-8">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-500 mb-6 text-center">
          Register Now
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
              id="name"
              className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all"
              placeholder="Enter your name"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="mt-2 p-2 text-sm text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-300 rounded-md">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email address
            </label>
            <input
              type="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all"
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="mt-2 p-2 text-sm text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-300 rounded-md">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
              id="password"
              className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all"
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="mt-2 p-2 text-sm text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-300 rounded-md">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              id="rePassword"
              className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all"
              placeholder="Confirm your password"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="mt-2 p-2 text-sm text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-300 rounded-md">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
              id="phone"
              className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all"
              placeholder="Enter your phone (e.g., 01012345678)"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="mt-2 p-2 text-sm text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-300 rounded-md">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-all disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Success/Error Messages */}
          {sucessMsg ? (
            <div className="mt-6 p-4 text-lg text-green-800 bg-green-50 dark:bg-green-900/50 dark:text-green-300 rounded-md text-center">
              {sucessMsg}
            </div>
          ) : null}
          {errorMsg ? (
            <div className="mt-6 p-4 text-lg text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-300 rounded-md text-center">
              {errorMsg}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Register;