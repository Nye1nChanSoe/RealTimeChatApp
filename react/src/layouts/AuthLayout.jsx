import { Navigate, Outlet } from "react-router-dom";
import ErrorResponse from '../components/ErrorResponse';
import { useErrorHandlingContext } from "../contexts/ErrorHandlingContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import axiosClient from "../axios-client";

const AuthLayout = () => {
  const {errors} = useErrorHandlingContext();
  const {user, setUser, token} = useAuthContext();

  if(!token) {
    return <Navigate to='/login' />
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const handleUnload = (e) => {
      e.preventDefault();
      try {
        updateStatus();
      } catch (error) {
        console.error('Error updating status: ', error);
      }
    };

    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('unload', handleUnload);
    }
  }, [user]);

  const updateStatus = async () => {
    try {
      const payload = {status: 'inactive'};
      await axiosClient.patch(`/users/${user.user_id}`, payload);
      console.log(user.user_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main>
        <Outlet />
      </main>
      { errors.length > 0 && <ErrorResponse errors={errors} /> }
    </div>
  );
};

export default AuthLayout;