import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e?.preventDefault();

        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);

            dispatch(login(data.user));
            navigate({ to: '/dashboard' });

            console.log('signin success');
        } catch (err) {
            setError(
                err.message || 'Login failed. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-3xl shadow-lg p-8"
        >
            <div className="text-center mb-8">
                

                <h2 className="text-3xl font-bold text-gray-900">
                    Welcome Back!
                </h2>

                <p className="mt-2 text-gray-500">
                    Login to manage your shortened URLs
                </p>
            </div>

            {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                >
                    Email Address
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 transition-all"
                />
            </div>

            <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 transition-all"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
                    loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 hover:bg-black'
                }`}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Don't have an account?
                    <span
                        onClick={() => state(false)}
                        className="ml-1 cursor-pointer font-semibold text-gray-900 hover:underline"
                    >
                        Register
                    </span>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;