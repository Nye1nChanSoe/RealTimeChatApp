import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const GuestLayout = () => {
  const {token} = useAuthContext();

  if(token) {
    return <Navigate to='/chats' />
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;