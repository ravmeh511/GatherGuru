import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './Navbar/AdminNavbar';

 const mockUsers = [
  {
    name: 'Ethan Bennett',
    email: 'ethan@events360.com',
    role: 'Organizer',
    status: 'Active',
    lastLogin: '2024-01-19',
  },
  {
    name: 'Ava Foster',
    email: 'ava@creativehub.io',
    role: 'Organizer',
    status: 'Active',
    lastLogin: '2024-01-20',
  },
  {
    name: 'Mia Coleman',
    email: 'mia@openstage.org',
    role: 'Organizer',
    status: 'Inactive',
    lastLogin: '2023-12-28',
  },
  {
    name: 'Olivia Carter',
    email: 'olivia.carter@gmail.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-12-15',
  },
  {
    name: 'Liam Harper',
    email: 'liam.h@gmail.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-21',
  },
  {
    name: 'Noah Reed',
    email: 'noah.reed@gmail.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-11-30',
  },
  {
    name: 'Jackson Hayes',
    email: 'jackson.h@gmail.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-18',
  },
  {
    name: 'Aiden Brooks',
    email: 'aidenb99@gmail.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-21',
  },
];


export default function AdminUserList() {
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredUsers = mockUsers.filter((user) => {
    return (
      (roleFilter === 'All' || user.role === roleFilter) &&
      (statusFilter === 'All' || user.status === statusFilter)
    );
  });

  return (
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-100 p-6">
        
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Users</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Add New User
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="All">Role</option>
            <option value="Admin">Admin</option>
            <option value="Organizer">Organizer</option>
            <option value="User">User</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="All">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Login</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3 text-indigo-600">{user.role}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">{user.lastLogin}</td>
                  <td className="p-3 space-x-2 text-sm text-indigo-600">
                    <Link to="/admin/user-profile" className="hover:underline">View profile</Link>
                    <button className="hover:underline">Edit</button>
                    <button className="hover:underline">
                      {user.status === 'Active' ? 'Suspend' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
