import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    console.log(auth);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user));
            navigate({ to: "/dashboard" });
            setLoading(false);
            console.log("signin success");
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Welcome Back 👋
                </h2>
                <p className="mt-2 text-gray-500">
                    Login to manage your shortened URLs
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="mb-5">
                <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="email"
                >
                    Email Address
                </label>
                <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-6">
                <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
                    loading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                }`}
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Don't have an account?
                    <span
                        onClick={() => state(false)}
                        className="ml-1 cursor-pointer text-indigo-600 hover:text-indigo-700 font-semibold"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;