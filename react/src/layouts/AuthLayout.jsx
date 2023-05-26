import { Outlet } from "react-router-dom";
import ErrorResponse from '../components/ErrorResponse';
import { useErrorHandlingContext } from "../contexts/ErrorHandlingContext";

const AuthLayout = () => {
  const {errors} = useErrorHandlingContext();

  return (
    <div>
      <main>
        <Outlet />
      </main>
      { errors && <ErrorResponse errors={errors} /> }
    </div>
  );
};

export default AuthLayout;