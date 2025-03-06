import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
  const [resetCode, setResetCode] = useState('');
  const navigate = useNavigate();


    async function resetECode(resetCode) {
        try {
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{resetCode})
            console.log(data);
            if(data.status === "Success"){
                toast.success("Code Reset Correct")
            }
            setTimeout(() => {
                navigate("/forgotpassword/resetpassword"); 
              }, 1000); 
        } catch (error) {
            console.log(error);
            
        }
    }

  const handleInputChange = (e) => {
    setResetCode(e.target.value);
  };

  const handleSubmit = () => {
    if (!resetCode) {
        alert('Please enter your email.');
        return;
      }
      resetECode(resetCode);
  };




  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 pt-20">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify Reset Code</h2>
        <label className="block text-gray-700 text-lg mb-2">Enter Reset Code</label>
        <input
          type="text"
          placeholder="Enter the reset code"
          value={resetCode}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Verify Code
        </button>
      </div>
    </div>
  );
}
