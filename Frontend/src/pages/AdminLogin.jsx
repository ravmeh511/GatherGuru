import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(''); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin/login`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const profile = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/profile`,
          { withCredentials: true }
        );

        const user = {
          ...profile.data.data,
          token: response.data.token, // ✅ Attach token for Redux to store it
        };

        dispatch(loginSuccess(user));
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Background Shape */}
      <div className="absolute top-0 left-0 w-[55%] h-full bg-[#1e294f] transform -skew-x-[5deg] z-0"></div>

      {/* Login Form Card */}
      <div className="relative z-10 bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login <span className="text-purple-600">GatherGuru</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter password"
                required
              />
              <span
                className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="text-sm text-red-600 text-center">{errorMsg}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 ${
              loading ? 'bg-gray-400' : 'bg-[#1e294f] hover:bg-[#2f3c66]'
            } text-white rounded-lg transition duration-300 font-semibold`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
