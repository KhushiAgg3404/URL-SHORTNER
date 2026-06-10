import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/slice/authSlice';
import { getCurrentUser } from '../api/user.api';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();

        dispatch(login(data.user));
      } catch (err) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};

export default AuthInitializer;