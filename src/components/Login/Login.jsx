import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from '../../Context/AuthContext';
import { DecodedContext } from '../../Context/DecodedContext';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  let [errorMsg, setErrorMsg] = useState(null);
  let [sucessMsg, setSuccessMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid Email'),
    password: yup.string().required('Password is required').matches(/^[A-z0-9_]{6,30}$/, 'From 6 to 30 characters'),
  });
  const { token, setToken } = useContext(AuthContext);
  const { setDecodedToken, decodedToken } = useContext(DecodedContext);

  async function login(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      setSuccessMsg(res.data.message);
      setToken(res.data.token);
      try {
        const decoded = jwtDecode(res?.data.token);
        setDecodedToken(decoded.id);
        console.log("Decoded Token:", decoded);
        console.log("Decoded Token ID:", decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
      localStorage.setItem('token', res.data.token);
      setTimeout(() => { navigate('/'); }, 1500);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-8">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-500 mb-6 text-center">
          Login Now
        </h2>
        <form onSubmit={formik.handleSubmit}>
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              name="password"
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

          {/* Buttons and Links */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-all disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Submit'}
            </button>
            <div className="text-base text-gray-600 dark:text-gray-300">
              Don’t have an account yet?{' '}
              <Link
                to="/register"
                className="text-green-600 hover:text-green-700 font-medium hover:underline transition-all"
              >
                Register
              </Link>
            </div>
            <Link
              to="/forgotpassword"
              className="w-full text-center bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-all"
            >
              Forgot Password
            </Link>
          </div>

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

export default Login;