import { useEffect, useRef, useState } from "react";
import axiosClient, { cancelPendingRequest } from "../axios-client";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { PuffLoader } from 'react-spinners';
import { useNavigate, useParams } from "react-router-dom";
import { useMessageContext } from "../contexts/MessageContext";
import { isEqual } from 'lodash';
import { useErrorHandlingContext } from "../contexts/ErrorHandlingContext";
import {useAuthContext} from '../contexts/AuthContext';

const Messages = () => {
  const {messages, setMessages, imageURLs} = useMessageContext();
  const {user, token} = useAuthContext();
  const {addError} = useErrorHandlingContext();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const {conversationId} = useParams();
  const navigate = useNavigate();

  const messagesRef = useRef([]);
  const intervalIdRef = useRef(null);
  const cancelTokenSourceRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const pollInterval = 5000; // poll every 5s

  useEffect(() => {
    setIsEmpty(true);
    if(conversationId) {
      // load the messages for each conversation and set loading to true
      initialize();
      fetchParticipants();

      pollMessageUpdates();
    }

    // When the component is unmounted the clean up functions specified 
    // in the return statement will be invoked 
    return () => {
      if(intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if(cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel('Request canceled');
      }
    }
  }, [conversationId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
       // * scrollTop: gets or sets the number pixels scrolled vertically
       // * scrollHeight: height of an element including paddings, excluding borders and margin
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const pollMessageUpdates = () => {
    if(conversationId) {
      intervalIdRef.current = setInterval(() => {
        fetchMessages();
      }, pollInterval);
    }
  };

  const fetchMessages = async () => {
    cancelTokenSourceRef.current = cancelPendingRequest();
    try {
      const res = await axiosClient.get(`/conversations/${conversationId}/messages`, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      if(res) {
        const {data} = res.data;
        // only update the messages if it fetched messages are different from previous messages
        if(!isEqual(data, messagesRef.current)) {
          setMessages(data);
          storeImageURLArray(data);
          if(conversationId && data.length === 0) {
            setIsNew(true);
          } else {
            setIsEmpty(!data.length);
          }
          messagesRef.current = data;
        }
      }
    } catch(error) {
      const {response} = error;
      if(response && response.status === 404) {
        addError(response.data.message);
        return navigate('/chats');
      } else {
        addError(error.message);
      }
    }
  };

  const initialize = async () => {
    setLoading(true);
    cancelTokenSourceRef.current = cancelPendingRequest();
    try {
      const res = await axiosClient.get(`/conversations/${conversationId}/messages`, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      if(res) {
        const {data} = res.data;
        setMessages(data);
        storeImageURLArray(data);

        if(conversationId && data.length === 0) {
          setIsNew(true);
        } else {
          setIsEmpty(!data.length);
        }
        messagesRef.current = data;
      }
    } catch(error) {
      console.log(error);
      const {response} = error;
      if(response && response.status === 404) {
        addError(response.data.message);
        setLoading(false);
        setIsEmpty(true);
        navigate('/chats');
      } else {
        addError(error.message);
      }
    }
  };

  const storeImageURLArray = (data) => {
    imageURLs.current = data
      .filter((msg) => msg.type === 'image')
      .map((msg) => `http://localhost:8000/api/conversations/${conversationId}/images/${msg.content}/?token=${token}`);
  };

  const fetchParticipants = async () => {
    try {
      const res = await axiosClient.get(`/conversations/${conversationId}`, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      if(res) {
        const {data} = res.data;
        setParticipants(data.participants);
        setLoading(false);
      }
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    const payload = {
      'content': `Hello!, ${participants.map((person) => person.firstname + ' ' + person.lastname).join(', ')}`,
    };
    try {
      setIsNew(false);
      setIsEmpty(false);
      const res = await axiosClient.post(`/conversations/${conversationId}/messages`, payload);
      const {data} = res.data;
      setMessages([data]);
    } catch(error) {
      addError(error.message);
    }
  }

  return (
    <div>
      <div
        ref={ messagesContainerRef } 
        className="overflow-y-auto scroll-smooth"
        style={{ height: 'calc(100vh - 176px)' }}
      >
        {
          !loading &&
          <div>
            <ChatHeader participants={ participants } />
            { messages.map((msg, index) =>
                <MessageBubble
                  key={ index }
                  message={ msg }
                  isSelf={ msg.sender_id === user.user_id }
                />
              )
            }
          </div>
        }
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* if it's not loading (done initializing) and still got empty result */}
          { (!loading && isEmpty && !isNew) && 
            <div className="flex flex-col items-center gap-y-2">
              <p className="text-gray-500">Select a conversation</p>
            </div>
          }
          { (!loading && isEmpty && isNew) && 
            <div className="flex flex-col items-center gap-y-2">
              <p className="text-black bg-slate-50 p-4 cursor-pointer rounded-lg hover:bg-slate-100" onClick={ handleSendMessage }>Say Hello to {participants.map((person) => person.firstname + ' ' + person.lastname).join(', ')}</p>
            </div>
          }

          {/* Shows every time the user switch to another conversation  */}
          <PuffLoader
            loading={loading}
            height={8}
            width={2}
            margin={-6}
            speedMultiplier={1.8}
            color='dodgerBlue'
          />
        </div>
      </div>
      <MessageInput />
    </div>
  )
};

export default Messages;