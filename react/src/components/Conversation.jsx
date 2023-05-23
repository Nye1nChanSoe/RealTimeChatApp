import PropTypes from 'prop-types';
import { diffForHumans } from '../helpers';
import { useParams } from 'react-router-dom';
import axiosClient, { cancelPendingRequest } from '../axios-client';
import { useEffect, useRef, useState } from 'react';

const Conversation = ({ id,  conversation, participants }) => {
  const [lastMessge, setLastMessage] = useState('');
  const [names, setNames] = useState('');
  const {conversationId} = useParams();

  const intervalIdRef = useRef(null);
  const cancelTokenSourceRef = useRef(null);

  useEffect(() => {
    setLastMessage(conversation.last_message);
    // cut the first participant AKA you
    setNames(participants.slice(1).map((person) => `${person.firstname} ${person.lastname}`).join(', '));
  }, []);

  useEffect(() => {
    pollConversationUpdates();  // every 5s

    return () => {
      if(intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if(cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel('Request canceled');
      }
    }
  }, [conversationId]);


  // preiodic polling to get latest conversation data
  const pollConversationUpdates = async () => {
    if( conversationId === id) {
      intervalIdRef.current = setInterval(() => {
        // console.log('Check Leaks!');
        fetchLastMessageFromConversation();
      }, 5000);
    }
  };

  const fetchLastMessageFromConversation = async () => {
    cancelTokenSourceRef.current = cancelPendingRequest();
    try {
      const res = await axiosClient.get(`/conversations/${conversationId}`, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      if(res) {
        const {data} = res.data;
        setLastMessage(data.conversation.last_message);
      }
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex items-center space-x-3 px-6 py-4 cursor-pointer ${ conversationId === id ? 'bg-gray-100' : '' } hover:bg-gray-100`} >
      <div className='shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100'>
        <img src="" alt="" />
      </div>
      <div className='flex-1 overflow-hidden'>
        <h1 className='font-semibold'>{ names }</h1>
        <p className='truncate'>{ lastMessge }</p>
      </div>
      <div className='self-start'>
        <time className='text-sm text-gray-500'>{ diffForHumans(conversation.updated_at) }</time>
      </div>
    </div>
  );
};

Conversation.propTypes = {
  id: PropTypes.string.isRequired,
  conversation: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
};

export default Conversation;