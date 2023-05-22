import { useEffect, useRef, useState } from "react";
import axiosClient, { cancelPendingRequest } from "../axios-client";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { PuffLoader } from 'react-spinners';
import { useParams } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
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

    return () => {
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
  }, [messages]);

  const fetchMessages = async () => {
    cancelTokenSourceRef.current = cancelPendingRequest();
    try {
      setLoading(true);
      const res = await axiosClient.get(`/conversations/${conversationId}/messages`, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      if(res) {
        const {data} = res.data;
        // console.log(data);
        setMessages(data);
      }
    } catch(error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchParticipants = async () => {
    try {
      setLoading(true);
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
                sender={ msg.sender }
                message={ msg.content }
                isSelf={ msg.type === 'self' }
              />
            ) }
          </div>
          : ''
        }
      </div>
      <MessageInput 
        messages={ messages } 
        setMessages={ setMessages } 
      />
    </div>
  )
};

export default Messages;