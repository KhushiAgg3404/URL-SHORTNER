import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from '../api/user.api';

const APP_URL = "https://url-shortner-0mkg.onrender.com";

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
        Error loading your URLs: {error.message}
      </div>
    );
  }

  if (!urls?.urls || urls.urls.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-gray-200 rounded-2xl">
        <h3 className="text-lg font-semibold text-gray-900">
          No URLs Yet
        </h3>

        <p className="text-gray-500 mt-2">
          Create your first shortened link above.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-5">
        Your URLs
      </h2>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Original URL
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Short URL
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Clicks
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {[...urls.urls].reverse().map((url) => (
                <tr
                  key={url._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate text-sm text-gray-700">
                      {url.full_url}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href={`${APP_URL}/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline font-medium text-sm"
                    >
                      {`${APP_URL}/${url.short_url}`}
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleCopy(
                          `${APP_URL}/${url.short_url}`,
                          url._id
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 ${
                        copiedId === url._id
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-900 hover:bg-black'
                      }`}
                    >
                      {copiedId === url._id ? 'Copied!' : 'Copy URL'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserUrl;