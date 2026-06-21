import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import { useNavigate } from '@tanstack/react-router';
import { logoutUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { queryClient } from '../main';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());
      queryClient.clear();

      navigate({ to: '/' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

            <div>
              <div className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-3">
                Dashboard
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Manage Your Links
              </h1>

              <p className="text-gray-500 mt-2">
                Create, organize, and access all your shortened URLs in one place.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Logout
            </button>

          </div>

          {/* URL Form */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
            <UrlForm />
          </div>

          {/* User URLs */}
          <div className="border-t border-gray-200 pt-8">
            <UserUrl />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardPage;