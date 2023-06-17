import { useAuthContext } from '../contexts/AuthContext';
import Logout from "../components/Logout";
import { useEffect, useState } from 'react';
import Profile from './Profile';

const Navigation = () => {
  const {user, token} = useAuthContext();
  const [showProfile, setShowProfile] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if(user) {
      /**
       * Browsers often cache images to improve performance and reduce necessary network requests
       * To ensure the latest image is displayed, apply a cache-busting mechanism to the image URL
       * Common way is to add a query param with a unique value, in this case v=unique_value
       */
      setImageSrc(`http://localhost:8000/api/images/${user.user_id}/profile?token=${token}&v=${Math.random()}`);
    }
  }, [user]);

  const handleClick = () => {
    setShowProfile(true);
  };

  return (
    <nav className="flex justify-between items-center h-16 px-6 border-b gap-x-5">
      <div className="flex items-center gap-x-2">
        {
          user
          ? <div className='w-7 h-7 rounded-full overflow-hidden border-2'>
              <img src={ imageSrc } className='w-full h-full object-cover' />
            </div>
          : <div className='shrink-0 w-7 h-7 rounded-full border-2 overflow-hidden bg-gray-100 animate-pulse'>
              <img src="" alt="" />
            </div>
        }
        {
          user
            ? <div onClick={ handleClick } className='cursor-pointer hover:text-blue-500'>
                { user.firstname }
              </div>
            : 'Loading...'
        }
      </div>
      <Logout />

      { showProfile && <Profile setShowProfile={ setShowProfile } imageSrc={ imageSrc } /> }
    </nav>
  );
};``

export default Navigation;