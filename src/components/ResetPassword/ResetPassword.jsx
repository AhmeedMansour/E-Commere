import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

        async function resetPassword(email,newPassword) {
            try {
                const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{email,newPassword})
                console.log(data);
              if(data.token){
                toast.success("OFFFF AAAAA777!!!")
              }  
              setTimeout(() => {
                navigate("/login"); 
              }, 1000); 
            } catch (error) {
                console.log(error);
                
            }
        }









  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (!email) {
        alert('Please enter your email.');
        return;
      }else if(!newPassword){
        alert('Please enter your New Password')
      }
      resetPassword(email,newPassword);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 pt-20">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Your Password</h2>

        <label className="block text-gray-700 text-sm mb-2">Your Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label className="block text-gray-700 text-sm mt-4 mb-2">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={handlePasswordChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleSubmit}
          className="cursor-pointer mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
