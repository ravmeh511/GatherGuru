import React, { useState } from "react";
import gatherguru_logo from "../../assets/gatherguru_logo.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSuccess } from "../../redux/features/authSlice";

function UserLogin() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [errorMsg, setErrorMsg] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
     const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`,formData,{withCredentials:true});
     if(response.status===200){
        const profile=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`,{withCredentials:true});
        const user={
            ...profile.data.data,
            token:response.data.token,
        };
        dispatch(loginSuccess(user));
        navigate('user/dashboard',{replace:true});
     }
    }
    catch(error){
        setErrorMsg(error.response?.data?.message || 'Invalid email or password');


    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#1c1b29] text-white flex flex-col justify-center items-center px-12 py-10 rounded-r-3xl">
        <img src={gatherguru_logo} alt="logo" className="mb-6 w-max h-max" />
        <h1 className="text-3xl font-bold mb-2">Discover tailored events.</h1>
        <p className="text-lg text-gray-300">
          Sign up for personalized recommendations today!
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white flex justify-center items-center">
        <div className="max-w-md w-full space-y-6 p-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          </div>
          {errorMsg && (
            <div className="text-sm text-red-600 text-center">{errorMsg}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your e-mail"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1c1b29] text-white py-2 rounded-lg hover:bg-[#292841] transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center gap-4">
            <hr className="flex-grow border-t" />
            <span className="text-gray-400">OR</span>
            <hr className="flex-grow border-t" />
          </div>

          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link className="text-[#1c1b29] font-medium cursor-pointer hover:underline" to="/user/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
