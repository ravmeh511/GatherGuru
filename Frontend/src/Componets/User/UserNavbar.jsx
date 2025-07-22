import React, { useState } from "react";
import { FaBars, FaTimes, FaTicketAlt, FaStar, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import gatherguru_logo from "../../assets/gatherguru_logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

const UserNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleLogout = () => {
    dispatch(logout())
    navigate("/");
  };

  return (
    <nav className="bg-[#2B293D] text-white px-6 py-2 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={gatherguru_logo} alt="logo" className="w-[50%] h-full" />
          {/* <span className="text-yellow-400 font-bold text-xl">GatherGuru</span> */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <Link to="/user/dashboard" className="hover:text-yellow-400">Home</Link>
          <Link to="/events" className="hover:text-yellow-400">Events</Link>
          <Link to="/about" className="hover:text-yellow-400">About</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
         
          <Link to="/my-tickets" className="flex items-center gap-1 hover:text-yellow-400">
            <FaTicketAlt /> Tickets
          </Link>
          <Link to="/interested" className="flex items-center gap-1 hover:text-yellow-400">
            <FaStar /> Interested
          </Link>
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:text-yellow-400"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle className="text-lg" />
              <span>Profile</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-50">
                <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-sm">
          <Link to="/user/dashboard" className="block hover:text-yellow-400">Home</Link>
          <Link to="/events" className="block hover:text-yellow-400">Events</Link>
          <Link to="/about" className="block hover:text-yellow-400">About</Link>
          <Link to="/contact" className="block hover:text-yellow-400">Contact</Link>
          
          <Link to="/my-tickets" className="block hover:text-yellow-400">Tickets</Link>
          <Link to="/interested" className="block hover:text-yellow-400">Interested</Link>
          <Link to="/user/profile" className="block hover:text-yellow-400">View Profile</Link>
          <button onClick={handleLogout} className="block w-full text-left hover:text-yellow-400">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
