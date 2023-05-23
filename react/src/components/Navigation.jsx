import { useAuthContext } from '../contexts/AuthContext';
import Logout from "../components/Logout";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { HiOutlineUserCircle } from 'react-icons/hi';

const Navigation = () => {
  const {user, setUser} = useAuthContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <nav className="flex justify-between items-center h-16 px-6 border-b gap-x-5">
      <div className="flex items-center gap-x-1">
        <HiOutlineUserCircle className="w-5 h-5" />
        {
          user ? user.firstname : 'Loading...'
        }
      </div>
      <Logout />
    </nav>
  );
};

export default Navigation;