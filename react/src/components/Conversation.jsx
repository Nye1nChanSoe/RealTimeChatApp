import PropTypes from 'prop-types';
import { diffForHumans } from '../helpers';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLastConversastionContext } from '../contexts/RememberLastConversationContext';
import { useAuthContext } from '../contexts/AuthContext';

const Conversation = ({ chat }) => {
  const {conversationId} = useParams();
  const {setConversationID} = useLastConversastionContext();

  useEffect(() => {
    if(conversationId) {
      setConversationID(conversationId);
    }
  }, [conversationId]);

  return (
    <div 
      className={`flex items-center space-x-3 px-6 py-4 text-sm cursor-pointer
      ${ conversationId === chat.conversation_id ? 'bg-gray-50' : 'hover:bg-gray-200' }`}
    >
      <div className='shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100'>
        <img src="" alt="" />
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