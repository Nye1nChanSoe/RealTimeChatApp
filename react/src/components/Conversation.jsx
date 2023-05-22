import PropTypes from 'prop-types';
import { diffForHumans } from '../helpers';
import { useParams } from 'react-router-dom';

const Conversation = ({ id,  conversation, participants }) => {
  const {conversationId} = useParams();

  // cut the first participant AKA you
  const names = participants.slice(1).map((person) => `${person.firstname} ${person.lastname}`);

  return (
    <div className={`flex items-center space-x-3 px-6 py-4 cursor-pointer ${ conversationId == id ? 'bg-gray-100' : '' } hover:bg-gray-100`} >
      <div className='shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100'>
        <img src="" alt="" />
      </div>
      <div className='flex-1 overflow-hidden'>
        <h1 className='font-semibold'>{ names.join(", ") }</h1>
        <p className='truncate'>{ conversation.last_message }</p>
      </div>
      <div className='self-start'>
        <time className='text-sm text-gray-500'>{ diffForHumans(conversation.updated_at) }</time>
      </div>
    </div>
  );
};

Conversation.propTypes = {
  id: PropTypes.number.isRequired,
  conversation: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
};

export default Conversation;