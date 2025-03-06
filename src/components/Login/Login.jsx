  import axios from 'axios';
  import { useFormik } from 'formik'
  import React, { useState } from 'react'
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
   const {token, setToken} = useContext(AuthContext)
   const {setDecodedToken,decodedToken} = useContext(DecodedContext)

    async function login(values) {
      setErrorMsg(null)
      setSuccessMsg(null)
      setLoading(true)
      try {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        setSuccessMsg(res.data.message)
        setToken(res.data.token)
        try {
          const decoded = jwtDecode(res?.data.token);
          setDecodedToken(decoded.id);
          console.log("Decoded Token:", decoded);
          console.log("Decoded Token ID:", decoded.id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
          
        localStorage.setItem('token', res.data.token)
       setTimeout(()=>{ navigate('/')},1500);
      } catch (error) {
        setErrorMsg(error.response.data.message)
      }
      finally{
        setLoading(false)
      }
    }

    
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      onSubmit: login,

      validationSchema,
    })

    return <>
      <div className="container mx-auto px-3.5 py-3.5">
      <h2 className='my-8 text-2xl font-semibold text-green-color'>Login Now :</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-8">

        {/* Email */}

        <div className="relative z-0 w-full mb-5 group">
        <input type="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}</div> : null}

        {/* password */}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}</div> : null}


  
    
          <div className="flex items-center justify-between flex-col gap-4">
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Submit
              </button>
              <div className="text-lg">
                Don't have an account yet?
                <Link
                  to="/register"
                  className="mx-2 text-lg text-green-500 hover:underline decoration-2 underline-offset-2 hover:text-green-600 tr5"
                >
                  Register
                </Link>
              </div>
              <Link
                to="/forgotpassword"
                className="hover:text-white text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-auto  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Forgot Password
              </Link>
            </div>

        {sucessMsg ? <div className="p-4 my-4  text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-center text-[24px]" role="alert">
          {sucessMsg}
        </div> : null}
        {errorMsg ? <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center text-[20px]" role="alert">
          {errorMsg}
        </div> : null}
      </form>

      </div>
    </>
  }

  export default Login
