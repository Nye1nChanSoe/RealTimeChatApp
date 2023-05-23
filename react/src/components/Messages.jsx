import { useEffect, useRef, useState } from "react";
import axiosClient, { cancelPendingRequest } from "../axios-client";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { PuffLoader } from 'react-spinners';
import { useParams } from "react-router-dom";
import { useMessageContext } from "../contexts/MessageContext";
import { useUtilityContext } from "../contexts/UtilityContext";

const Messages = () => {
  const {messages, setMessages} = useMessageContext();
  const {setNotification} = useUtilityContext();
  const [participants, setParticipants] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const {conversationId} = useParams();

  const intervalIdRef = useRef(null);
  const cancelTokenSourceRef = useRef(null);
  const messagesContainerRef = useRef(null);

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
    // console.count('useEffect'); // => 3 times getting executed
    if (messagesContainerRef.current) {
       // * scrollTop: gets or sets the number pixels scrolled vertically
       // * scrollHeight: height of an element including paddings, excluding borders and margin
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [loading]);

  const pollMessageUpdates = () => {
    if(conversationId) {
      intervalIdRef.current = setInterval(() => {
        fetchMessages();
      }, 5000);
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
        setMessages(data);
        setIsEmpty(!data.length);
      }
    } catch(error) {
      console.log(error);
      const {response} = error;
      if(response && response.status === 404) {
        setNotification(response.data.message);
      } else {
        setNotification(error.message);
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
        // console.log(data);
        setIsEmpty(data.length === 0);
      }
    } catch(error) {
      console.log(error);
      const {response} = error;
      if(response && response.status === 404) {
        setNotification(response.data.message);
      } else {
        setNotification(error.message);
      }
    }
  };

  const fetchParticipants = async () => {
    try {
      const res = await axiosClient.get(`/conversations/${conversationId}/participants`, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      if(res) {
        const {data} = res.data;
        // console.log(data);
        setParticipants(data.participants);
        setLoading(false);
      }
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        ref={ messagesContainerRef } 
        className="overflow-y-auto scroll-smooth"
        style={{ height: 'calc(100vh - 96px)' }}
      >
        {
          !loading &&
          <div>
            <ChatHeader participants={ participants } />
            { messages.map((msg, index) =>
                <MessageBubble
                key={ index }
                message={ msg }
                isSelf={ msg.type === 'self' }
                />
              ) 
            }
          </div>
        }
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* if it's not loading (done initializing) and still got empty result */}
          { (!loading && isEmpty) && 
            <div className="flex flex-col items-center gap-y-2">
              <p className="text-gray-500">Select a conversation</p>
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