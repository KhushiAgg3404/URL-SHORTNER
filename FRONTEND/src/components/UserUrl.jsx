import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const APP_URL = "https://url-shortner-0mkg.onrender.com"

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  if (!urls?.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg mt-5 shadow-md overflow-hidden">
      <div className="overflow-x-auto h-56">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {[...urls.urls].reverse().map((url) => (
              <tr key={url._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 truncate max-w-xs">
                    {url.full_url}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <a
                    href={`${APP_URL}/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 hover:underline"
                  >
                    {`${APP_URL}/${url.short_url}`}
                  </a>
                </td>

                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() =>
                      handleCopy(
                        `${APP_URL}/${url.short_url}`,
                        url._id
                      )
                    }
                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium text-white ${
                      copiedId === url._id
                        ? 'bg-green-600'
                        : 'bg-blue-600 hover:bg-blue-700'
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
  )
}

export default UserUrl