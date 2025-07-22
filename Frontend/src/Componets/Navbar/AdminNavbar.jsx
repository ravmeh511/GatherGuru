import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/authSlice';
import logo from './assets/gatherguru_logo.svg';

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin-login');
  };

  return (
    <header className="bg-[#2B293D] text-white px-6 py-3 flex justify-between items-center shadow">
      {/* Logo + Title */}
      <Link to="/admin/dashboard" className="flex items-center space-x-2">
        <img src={logo} alt="GatherGuru Logo" className="h-full w-[50%]" />
        
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/admin/events" className="hover:underline">Events</Link>
        <Link to="/admin/users" className="hover:underline">Users</Link>
        <Link to="/admin/settings" className="hover:underline">Settings</Link>

        {/* Avatar Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin Avatar"
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg z-50">
              <div className="flex items-center px-4 py-3 border-b">
                <img
                  src="https://i.pravatar.cc/60"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-semibold">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@gatherguru.com'}</p>
                </div>
              </div>

              <Link
                to="/admin/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
