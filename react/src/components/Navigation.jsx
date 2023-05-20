import { Navigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';

import Logout from "../components/Logout";
import axiosClient from "../axios-client";
import { useEffect } from "react";

const Navigation = () => {
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
    <nav className="flex justify-end items-center h-16 px-6 border-b gap-x-5">
      {
        user ? user.firstname : 'Loading...'
      }
      <Logout handleLogout={ handleLogout } />
    </nav>
  );
};

export default Navigation;