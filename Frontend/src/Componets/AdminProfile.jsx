import React from 'react';
import { useSelector } from 'react-redux';

export default function AdminProfile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">Admin Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <p className="text-lg font-semibold">{user?.name || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-lg font-semibold">{user?.email || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Role</label>
            <p className="text-lg font-semibold capitalize">{user?.role || 'admin'}</p>
          </div>
        </div>

        {/* Future button section */}
        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
