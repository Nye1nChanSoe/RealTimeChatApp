import { useEffect, useRef, useState } from "react";
import axiosClient, { cancelPendingRequest } from "../axios-client";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { PuffLoader } from 'react-spinners';
import { useParams } from "react-router-dom";
import { useMessageContext } from "../contexts/MessageContext";

const Messages = () => {
  const {messages, setMessages} = useMessageContext();
  const [participants, setParticipants] = useState('');
  const [loading, setLoading] = useState(true);
  const {conversationId} = useParams();

  const cancelTokenSourceRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if(conversationId) {
      fetchMessages();
      fetchParticipants();
    }

    // When the component is unmounted the clean up functions specified 
    // in the return statement will be invoked 
    return () => {
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
  }, [loading, messages]);

  const fetchMessages = async () => {
    cancelTokenSourceRef.current = cancelPendingRequest();
    try {
      setLoading(true);
      const res = await axiosClient.get(`/conversations/${conversationId}/messages`, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      if(res) {
        const {data} = res.data;
        setMessages(data);
        // console.log(data);
      }
    } catch(error) {
      console.log(error);
      setLoading(false);
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
      }
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div ref={ messagesContainerRef } className="overflow-y-auto px-6 scroll-smooth" style={{ height: 'calc(100vh - 160px)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
          <PuffLoader
            loading={loading}
            height={8}
            width={2}
            margin={-6}
            speedMultiplier={1.8}
            color='dodgerBlue'
          />
        </div>
        {
          !loading ?
          <div>
            <ChatHeader participants={ participants } />
            { messages.map((msg, index) =>
              <MessageBubble
                key={ index }
                message={ msg }
                isSelf={ msg.type === 'self' }
              />
            ) }
          </div>
          : ''
        }
      </div>
      <MessageInput />
    </div>
  )
};

export default Messages;