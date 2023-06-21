import PropTypes from 'prop-types';
import { diffForHumans } from '../helpers';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLastConversastionContext } from '../contexts/RememberLastConversationContext';
import { useAuthContext } from '../contexts/AuthContext';

const Conversation = ({ chat }) => {
  const {conversationId} = useParams();
  const {setConversationID} = useLastConversastionContext();

  const { token } = useAuthContext();
  const imageSrc = `${import.meta.env.VITE_API_BASE_URL}/api/images/${chat.participants[0].user_id}/profile?token=${token}`;

  useEffect(() => {
    if(conversationId) {
      setConversationID(conversationId);
    }

    const originalTitle = document.title;
    if(conversationId === chat.conversation_id) {
      document.title = chat.participants[0].firstname + ' ' + chat.participants[0].lastname;
    }

    return () => {
      document.title = originalTitle;
    }
  }, [conversationId]);

  return (
    <div 
      className={`flex items-center space-x-3 px-6 py-4 text-sm cursor-pointer
      ${ conversationId === chat.conversation_id ? 'bg-gray-50' : 'hover:bg-gray-200' }`}
    >
      <div className='relative'>
        <div className='relative shrink-0 flex items-center justify-center w-12 h-12 rounded-full border overflow-hidden'>
          <img src={ imageSrc } alt="" className='w-full h-full object-cover' />
        </div>
        <div className={`absolute bottom-0 right-1 w-2.5 h-2.5 ${ chat.participants[0].status === 'active' ? 'bg-green-400' : '' } rounded-full z-10`}></div>
      </div>
      <div className='flex-1 overflow-hidden'>
        <h1 className='font-semibold text-base truncate mb-1'>
          { chat.participants.map((person) => `${person.firstname} ${person.lastname}`).join(', ') }
        </h1>
        <p className='truncate'>{ chat.conversation.last_message ? chat.conversation.last_message : 'Start chatting now!' }</p>
      </div>
      <div className='self-center w-14 text-right'>
        <time className='text-gray-500 text-xs'>{ diffForHumans(chat.conversation.updated_at) }</time>
      </div>
    </div>
  );
};

Conversation.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default Conversation;