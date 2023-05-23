import PropTypes from 'prop-types';
import { diffForHumans } from '../helpers';
import { useParams } from 'react-router-dom';
import { useUtilityContext } from '../contexts/UtilityContext';
import { useEffect } from 'react';

const Conversation = ({ chat }) => {
  const {conversationId} = useParams();
  const {setSelectedConversation} = useUtilityContext();

  useEffect(() => {
    if(conversationId) {
      setSelectedConversation(conversationId);
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
          {/* slice(1) to cut out the first participant AKA auth user name */}
          { chat.participants.slice(1).map((person) => `${person.firstname} ${person.lastname}`).join(', ') }
        </h1>
        <p className='truncate'>{ chat.conversation.last_message }</p>
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