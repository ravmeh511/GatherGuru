import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../redux/features/authSlice';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer
} from 'recharts';
import AdminNavbar from './Navbar/AdminNavbar';

const kpiStats = [
  { label: 'Total Events', value: '1,250' },
  { label: 'Active Users', value: '8,500' },
  { label: 'Revenue', value: '$250,000' },
  { label: 'Tickets Sold', value: '15,000' },
];

const revenueData = [
  { month: 'Jan', value: 40000 },
  { month: 'Feb', value: 30000 },
  { month: 'Mar', value: 20000 },
  { month: 'Apr', value: 27800 },
  { month: 'May', value: 18900 },
  { month: 'Jun', value: 23900 },
  { month: 'Jul', value: 34900 },
];

const attendanceData = [
  { name: 'Event A', attendees: 3000 },
  { name: 'Event B', attendees: 2800 },
  { name: 'Event C', attendees: 2500 },
  { name: 'Event D', attendees: 2400 },
  { name: 'Event E', attendees: 2300 },
];

const roleStats = [
  { role: 'Admin', count: 1500 },
  { role: 'Organizer', count: 2500 },
  { role: 'Attendee', count: 4500 },
];

const upcomingEvents = [
  { title: 'Tech Conference 2024', date: 'September 1, 2024', color: 'bg-green-500' },
  { title: 'Music Fest 2024', date: 'September 8, 2024', color: 'bg-yellow-500' },
  { title: 'Art Exhibition', date: 'September 15, 2024', color: 'bg-blue-500' },
];

export default function AdminDashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Header */}
   

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {kpiStats.map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">{kpi.label}</p>
            <p className="text-xl font-bold">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Over Time */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Revenue Over Time</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Events by Attendance */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Top 5 Events by Attendance</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="attendees" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Role Distribution */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">User Role Distribution</h2>
        {roleStats.map((role, idx) => (
          <div key={idx} className="mb-2">
            <div className="flex justify-between text-sm">
              <span>{role.role}</span>
              <span>{role.count}</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-indigo-500 h-2 rounded"
                style={{ width: `${(role.count / 8500) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
        <ul>
          {upcomingEvents.map((event, idx) => (
            <li key={idx} className="flex items-center mb-2">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${event.color}`}></span>
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
