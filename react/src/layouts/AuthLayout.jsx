import { Outlet } from "react-router-dom";
import ErrorResponse from '../components/ErrorResponse';
import { useErrorHandlingContext } from "../contexts/ErrorHandlingContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import axiosClient from "../axios-client";

const AuthLayout = () => {
  const {errors} = useErrorHandlingContext();
  const {setUser} = useAuthContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

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