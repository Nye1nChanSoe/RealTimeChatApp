import { useEffect, useRef, useState } from 'react';
import { HiOutlinePaperClip } from 'react-icons/hi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { useMessageContext } from '../contexts/MessageContext';
import { useErrorHandlingContext } from '../contexts/ErrorHandlingContext';

const MessageInput = () => {
  const {messages, setMessages} = useMessageContext();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const textAreaRef = useRef(null);
  const {conversationId} = useParams();

  const {errors, addError} = useErrorHandlingContext();

  useEffect(() => {
    textAreaRef.current.focus();
  }, [messages, errors]);

  const handleSendMessage = async () => {
    const payload = {
      'content': message,
    };

    setLoading(true);
    try {
      setMessage('');
      const res = await axiosClient.post(`/conversations/${conversationId}/messages`, payload);
      const {data} = res.data;
      setMessages([...messages, data]);
      setLoading(false);
    } catch(error) {
      if(error && error.response.status === 404) {
        addError('Select a conversation to send messages');
      } else {
        addError(error.message);
      }
      setLoading(false);
    }
  }

  // Custom key events for textarea element
  const handleKeyEvents = (e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if(message) {
        handleSendMessage();
      }
    }
  };

  const handleChange = (e) => {
    setMessage(e.currentTarget.value);
  }

  return (
    <div className="h-24">
      <div className='flex items-center px-6 h-full'>
        <div 
          className='relative w-full h-12 py-2.5 px-2 bg-white border drop-shadow-xl shadow-teal-600 rounded-xl'
          style={{ transition: "height 0.3s ease" }}
        >
          <textarea
            ref={ textAreaRef }
            onKeyDown={ handleKeyEvents }
            onChange={ handleChange }
            placeholder='Write Something . . .'
            className='resize-none h-full w-full pl-1.5 pr-7 overflow-hidden focus:outline-none'
            value={ message }
          />
          {
            loading
            ? <div className="absolute right-2.5 bottom-3.5 h-6 cursor-pointer">
                <MoonLoader
                  loading={ loading }
                  size={ 20 }
                  color='dodgerBlue'
                  speedMultiplier={ 0.8 }
                />
              </div>
            : <button 
                disabled={ !message }
                onClick={ handleSendMessage }
                className={`absolute right-2.5 bottom-3.5 h-6 ${ !message ? 'text-gray-400' : 'cursor-pointer hover:text-blue-500' }`}
              >
                <HiOutlinePaperAirplane className='w-5 h-5 rotate-45' />
              </button>
          }
        </div>

        <div className='flex items-center px-5 gap-x-5'>
          <HiOutlinePaperClip className='w-5 h-5'/>
          <HiOutlineEmojiHappy className='w-5 h-5'/>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;