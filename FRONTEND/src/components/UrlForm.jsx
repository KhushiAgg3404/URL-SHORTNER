import React, { useState } from 'react';
import { createShortUrl } from '../api/ShortUrl.api.js';
import { useSelector } from 'react-redux';
import { QueryClient } from '@tanstack/react-query';
import { queryClient } from '../main';

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ['userUrls'] });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Enter your URL
        </label>

        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {isAuthenticated && (
        <div>
          <label
            htmlFor="customSlug"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Custom URL (Optional)
          </label>

          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
      >
        Shorten URL 
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Your Shortened URL
          </h2>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700"
            />

            <button
              onClick={handleCopy}
              className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                copied
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;