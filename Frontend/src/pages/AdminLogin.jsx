import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../redux/slices/authSlice";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data);
        dispatch(loginSuccess(response.data));
        navigate("/admin/dashboard", { replace: true });
        return; // Exit early on success, don't clear fields
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        setError(error.response.data.errors[0]?.msg);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again!");
      }
      // Only clear fields on error
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left Section - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-[#2B293D] text-white p-8 flex-col relative">
          <div className="absolute top-10 left-10">
            <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate('/')}>
              🎟️ GatherGuru
            </h1>
          </div>
          <div className="mt-auto mb-auto">
            <h2 className="text-5xl font-bold mb-4">Admin Portal</h2>
            <h3 className="text-3xl font-bold">Manage your events and organizers</h3>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B293D]"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B293D]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2B293D] text-white py-3 rounded-md font-semibold hover:bg-[#1a1928] transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin; 