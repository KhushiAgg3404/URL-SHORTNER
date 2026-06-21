import React from 'react';
import UrlForm from '../components/UrlForm';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-10">

          <div className="text-center mb-10">
            

            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Shorten Your Links
            </h1>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              Create clean, shareable URLs in seconds.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <UrlForm />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;