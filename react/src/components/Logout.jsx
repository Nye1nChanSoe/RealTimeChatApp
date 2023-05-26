import { HiOutlineLogout } from 'react-icons/hi';
import { useAuthContext } from '../contexts/AuthContext';
import axiosClient from '../axios-client';
import { Navigate } from 'react-router-dom';
import { useErrorHandlingContext } from '../contexts/ErrorHandlingContext';

const Logout = () => {
  const {token, setToken, setUser} = useAuthContext();
  const {addError} = useErrorHandlingContext();

  if(!token) {
    return <Navigate to='/login' />
  }

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post('/logout');
      setUser(null);
      setToken(null);
    } catch(error) {
      addError(error.message);
      console.error('Error: ', error);
    }
  };


  return (
    <div>
      <a href="/" onClick={ (e) => handleLogout(e) }>
        <HiOutlineLogout className='w-5 h-5 hover:text-blue-600' />
      </a>
    </div>
  );
};

export default Logout;