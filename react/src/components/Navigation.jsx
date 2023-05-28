import { useAuthContext } from '../contexts/AuthContext';
import Logout from "../components/Logout";
import { HiOutlineUserCircle } from 'react-icons/hi';

const Navigation = () => {
  const {user} = useAuthContext();

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