import React from 'react';
import UrlForm from '../components/UrlForm';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 border border-gray-200">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              URL Shortener
            </h1>
            <p className="mt-3 text-gray-600">
              Turn long links into clean, shareable URLs instantly.
            </p>
          </div>

          <UrlForm />

        </div>
      </div>
    </div>
  );
};

export default HomePage;