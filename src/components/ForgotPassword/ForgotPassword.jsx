import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  async function forgotpassword(email) {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email }
      );
      console.log('Success:', data);
      if(data.statusMsg == "success"){
        toast.success(data.message,{duration:3000})
      }
      setTimeout(() => {
        navigate("/forgotpassword/resetcode"); 
      }, 1000); 
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  }

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }
    forgotpassword(email);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 pt-20">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Account Recovery</h2>
        <label className="block text-gray-700 text-lg mb-2">Your Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Send Code
        </button>
      </div>
    </div>
  );
}
