import { useEffect, useRef, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import axiosClient, { cancelPendingRequest } from '../axios-client';
import Conversation from './Conversation';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { useErrorHandlingContext } from '../contexts/ErrorHandlingContext';

const Conversations = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const intervalIdRef = useRef(null);
  const cancelTokenSourceRef = useRef(null);
  const chatsRef = useRef([]);
  const {addError} = useErrorHandlingContext();

  useEffect(() => {
    initialize();
    pollConversationUpdates();

    return () => {
      if(intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if(cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel('Request canceled');
      }
    }
  }, []);

  // watcher for changes in chats
  useEffect(() => {
    setIsEmpty(chats.length === 0);
  }, [chats]);

  // HTTP Polling Request Every 5s
  const pollConversationUpdates =  () => {
    intervalIdRef.current = setInterval(() => {
      fetchConversations();
    }, 5000);
  };

  const initialize = async () => {
    setLoading(true);
    cancelTokenSourceRef.current = cancelPendingRequest();
    try {
      const res = await axiosClient.get('/conversations', {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      // API responses are also prefixed with 'data'
      if(res) {
        const {data} = res.data;
        setChats(data);
        setLoading(false);
        setIsEmpty(data.length === 0);
        chatsRef.current = data;
      }
    } catch(error) {
      addError(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    cancelTokenSourceRef.current = cancelPendingRequest();
    try {
      const res = await axiosClient.get('/conversations', {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      // API responses are also prefixed with 'data'
      if(res) {
        const {data} = res.data;
        if(!isEqual(data, chatsRef.current)) {
          setChats(data);
          chatsRef.current = data;
        }
      }
    } catch(error) {
      addError(error.message);
      console.log(error);
    }
  };

  return (
    <div className='w-full overflow-y-auto' style={{ height: 'calc(100vh - 144px)' }}>
      <div className='px-6 py-4 bg-white sticky top-0'>
        {/* search */}
        <input type="search" placeholder="Search..." className='border px-2 py-2 w-full rounded-lg' />
      </div>
      <div>
        {
          chats.map((chat, index) =>
          <Link key={ index } to={`/chats/${chat.conversation_id}`}>
            <Conversation chat={ chat } />
          </Link>
          )
        }
      </div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {/* If it's not loading (done initializing) and the chat is still empty */}
        { (!loading && isEmpty) && <div className='text-gray-500'>No Conversation</div> }

        {/* This will only show in the initializing stage */}
        <FadeLoader
          loading={loading}
          height={8}
          width={2}
          margin={-10}
          speedMultiplier={1.8}
          color='dodgerBlue'
        />
      </div>
    </div>
  );
};

export default Conversations;