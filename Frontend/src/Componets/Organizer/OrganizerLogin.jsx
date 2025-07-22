import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/authSlice';
import axios from '../../utils/axios';
import logo from '../../assets/gatherguru_logo.svg';

const OrganizerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/organizer/login', formData);
      console.log('Login response:', response.data); // Debug log
      
      if (response.data.success) {
        dispatch(login({
          token: response.data.data.token,
          role: 'organizer',
          userData: response.data.data
        }));
        
        navigate('/organizer/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Dark Background */}
      <div className="w-full md:w-1/2 bg-[#2B293D] text-white p-6 md:p-12 flex flex-col min-h-[300px] md:min-h-screen">
        <img src={logo} alt="GatherGuru Logo" className="w-24 md:w-32 mb-10 md:mb-20" />
        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Create amazing events.
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Sign in to manage your events and connect with attendees!
          </p>
        </div>
      </div>

      {/* Right Panel - White Background */}
      <div className="w-full md:w-1/2 bg-white px-4 py-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="mt-2 text-gray-600">Please sign in to your organizer account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#2B293D] text-white py-2.5 md:py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="mt-4 md:mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/organizer/signup" className="text-[#2B293D] font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
              <div className="flex justify-center space-x-4">
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-[#2B293D] transition-colors"
                >
                  Login as User
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/admin/login"
                  className="text-sm text-gray-600 hover:text-[#2B293D] transition-colors"
                >
                  Login as Admin
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizerLogin; 