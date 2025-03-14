import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { DecodedContext } from "../../Context/DecodedContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const { decodedToken } = useContext(DecodedContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getUsers() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/users/${decodedToken?.id || decodedToken}`,
        {
          headers: { token },
        }
      );
      const fetchedData = response.data?.data;
      setUserData(fetchedData);
      setName(fetchedData?.name || "");
      setEmail(fetchedData?.email || "");
      setPhone(fetchedData?.phone || "");
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateMe(name, email, phone) {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        { name, email, phone },
        { headers: { token, "Content-Type": "application/json" } }
      );
      await getUsers();
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function changePassword(currentPassword, newPassword, rePassword) {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
    const{data} =  await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        { currentPassword, password: newPassword, rePassword },
        { headers: { token, "Content-Type": "application/json" } }
      );

      
      toast.success("Password successfully changed. Please log in again.");
      localStorage.setItem('token',data.token)
      // localStorage.removeItem("token");
      // setTimeout(() => {
      //   window.location.href = "/login";

      // }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (decodedToken) getUsers();
  }, [decodedToken]);

  return (
    <div className="min-h-screen bg-transparent from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
  <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300">
    {/* Header Section */}
    <div className="bg-gradient-to-r from-green-400 to-green-900 p-6">
      <h2 className="text-3xl font-bold text-white text-center drop-shadow-md">User Profile</h2>
    </div>

    {/* Content Section */}
    <div className="p-8">
      {error && (
        <p className="text-red-500 dark:text-red-400 mb-4 text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg animate-pulse">
          {error}
        </p>
      )}

      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Loading...</p>
        </div>
      ) : userData ? (
        <div className="space-y-6">
          {!isEditing && !isChangingPassword ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 dark:text-gray-400 font-medium w-24">Name:</span>
                <span className="text-gray-800 dark:text-gray-200">{userData.name || "Not set"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 dark:text-gray-400 font-medium w-24">Email:</span>
                <span className="text-gray-800 dark:text-gray-200">{userData.email || "Not set"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 dark:text-gray-400 font-medium w-24">Phone:</span>
                <span className="text-gray-800 dark:text-gray-200">{userData.phone || "Not provided"}</span>
              </div>
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md"
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter new name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter new email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter new phone"
                />
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => updateMe(name, email, phone)}
                  className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Current Password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="New Password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Confirm New Password"
                />
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => changePassword(currentPassword, newPassword, rePassword)}
                  className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
                >
                  Save Password
                </button>
                <button
                  onClick={() => setIsChangingPassword(false)}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          No user data available
        </p>
      )}
    </div>
  </div>
</div>
  );
}
