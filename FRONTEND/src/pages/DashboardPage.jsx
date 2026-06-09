import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import { useNavigate } from '@tanstack/react-router';
import { logoutUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      navigate({ to: '/' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Create and manage your shortened URLs
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 hover:shadow-lg"
            >
              Logout
            </button>
          </div>

          <div className="mb-10">
            <UrlForm />
          </div>

          <div className="border-t border-gray-200 pt-8">
            <UserUrl />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;