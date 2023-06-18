import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import axiosClient, { cancelPendingRequest } from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const UserBubble = ({ user }) => {
  const { token } = useAuthContext();
  const [showName, setShowName] = useState(false);
  const navigate = useNavigate();
  const previousRequestRef = useRef();

  const imageSrc = `${import.meta.env.VITE_API_BASE_URL}/api/images/${user.user_id}/profile?token=${token}`;

  const handleClick = (user) => {
    createNewConversation(user);
  };

  const createNewConversation = async (user) => {
    const payload = {
      'title': 'My conversation title',
      'participant_id': user.user_id,
    };

    // cancel previous requests if it exists
    if(previousRequestRef.current) {
      previousRequestRef.current.cancel('Request canceled');
    }

    previousRequestRef.current = cancelPendingRequest();

    try {
      const res = await axiosClient.post('/conversations', payload, {
        cancelToken: previousRequestRef.current.token,
      });
      if(res) {
        const {data} = res.data;
        navigate(`/chats/${data.conversation_id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showFullName = () => {
    setShowName(true);
  };

  const hideFullName = () => {
    setShowName(false);
  };

  return (
    <div className='shrink-0 relative flex flex-col items-center justify-center gap-y-1 w-20 h-16' onClick={ () => handleClick(user) } onMouseEnter={ showFullName } onMouseLeave={ hideFullName }>
      {/* Profile image, name and status */}
      <div className='relative'>
        <div className='shrink-0 w-10 h-10 rounded-full border overflow-hidden flex items-center justify-center'>
          <img src={ imageSrc } alt="" className='w-full h-full object-cover' />
        </div>
        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${ user.status === 'active' ? 'bg-green-400' : '' } rounded-full z-10`}></div>
      </div>
      <div className='w-full'>
        <p className='text-sm text-center truncate'>{user.firstname}</p>
      </div>

      {
        showName &&
        <div className='absolute -bottom-10 z-20 w-content'>
          <p className='text-sm text-center bg-white p-2 drop-shadow-xl rounded-xl'>{user.firstname} {user.lastname}</p>
        </div>
      }
    </div>
  );
};

UserBubble.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserBubble;