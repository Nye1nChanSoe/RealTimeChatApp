import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-[#f0f0f0]'>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;