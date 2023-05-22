import { useEffect, useRef, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import axiosClient, { cancelPendingRequest } from '../axios-client';
import Conversation from './Conversation';
import { Link, useParams } from 'react-router-dom';

const Conversations = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const {conversationId} = useParams();

  const cancelTokenSourceRef = useRef(null);

  useEffect(() => {
    fetchConversations();

    // clean up the previous pending request on unmount
    return () => {
      if(cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel('Request canceled');
      }
    }
  }, [conversationId])

  const fetchConversations = async () => {
    cancelTokenSourceRef.current = cancelPendingRequest();
    try {
      const res = await axiosClient.get('/conversations', {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      // API responses are also prefixed with 'data'
      if(res) {
        const {data} = res;
        setChats(data.data);
      }
      setLoading(false);
    } catch(error) {
      // Context API error state
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='w-[350px]'>
      <div className='px-6 pb-4'>
        <input type="search" placeholder="Search..." className='border px-2 py-2 w-full rounded-lg' />
      </div>
      <div>
        {
          chats.map((chat, index) =>
          <Link key={ index } to={`/chats/${chat.conversation_id}`}>
            <Conversation
              id={ chat.conversation_id }
              conversation={ chat.conversation }
              participants={ chat.participants }
            />
          </Link>
          )
        }
      </div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2'>
        <FadeLoader
          loading={loading}
          height={8}
          width={2}
          margin={-6}
          speedMultiplier={1.8}
          color='dodgerBlue'
        />
      </div>
    </div>
  );
};

export default Conversations;