import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';

import Logout from "../components/Logout";
import axiosClient from "../axios-client";
import { useEffect } from "react";

const AuthLayout = () => {
  const {user, token, setUser, setToken} = useAuthContext();

  if(!token) {
    return <Navigate to='/login' />
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post('/logout');
      setUser(null);
      setToken(null);
    } catch(error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className="container mx-auto">
      <nav className="flex justify-end items-center h-16 py-4 px-10 w-full shadow">
        <div className="flex items-center space-x-6">
          <div>{ user ? user.firstname : 'Loading...' }</div>
          <Logout handleLogout={ handleLogout } />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;