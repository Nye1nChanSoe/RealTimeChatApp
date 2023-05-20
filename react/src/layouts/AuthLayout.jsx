import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
    <div className="container mx-auto">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;