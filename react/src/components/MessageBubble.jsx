import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';
import { useMessageContext } from '../contexts/MessageContext';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';
import { formatDateTime } from '../helpers';
import { useErrorHandlingContext } from '../contexts/ErrorHandlingContext';
import { useAuthContext } from '../contexts/AuthContext';

const MessageBubble = ({ message, isSelf }) => {
  const {messages, setMessages} = useMessageContext();
  const {token} = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const {conversationId} = useParams();
  const dropdownRef = useRef(null);

  const left = 'flex flex-row justify-start items-center gap-x-4 my-1.5';
  const right = 'flex flex-row justify-end items-center gap-x-4 my-1.5';

  const selfMessage = 'max-w-lg p-3 cursor-pointer bg-blue-500 text-white rounded-xl';
  const otherMessage = 'max-w-lg p-3 cursor-pointer bg-gray-100 text-black rounded-xl';

  const selfImage = 'max-w-lg max-h-60 cursor-pointer';
  const otherImage = 'max-w-lg max-h-60 cursor-pointer';

  const selfMessageTime = 'order-first text-xs text-gray-500';
  const otherMessageTime = 'text-xs text-gray-500';

  const {addError} = useErrorHandlingContext();

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    }
  }, []);

  const onDelete = async (e) => {
    try {
      setShowDropdown(false);
      await axiosClient.delete(`/conversations/${conversationId}/messages/${message.message_id}`);
      setMessages(messages.filter((msg) => msg.message_id !== message.message_id));
    } catch(error) {
      addError(error.message);
      console.log(error);
    }
  };

  const onClickOutside = (e) => {
    if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleDropdown = (e) => {
    setShowDropdown(true);
  };

  const dropdownObject = {
    delete: onDelete,
  };

  return (
    <div className='w-full px-6 relative'>
      <div className={ isSelf ? right : left }>
        {
          message.type === 'text'
          ? <p
              onDoubleClick={ (e) => isSelf ? handleDropdown(e) : '' }
              className={ isSelf ? selfMessage : otherMessage }
            >
              { message.content }
            </p>
          : <div>
              <img
                src={`http://localhost:8000/api/conversations/${conversationId}/images/${message.content}/?token=${token}`}
                className={ isSelf ? selfImage : otherImage }
              />
            </div>
        }
        <span className={ isSelf ? selfMessageTime : otherMessageTime }>{ formatDateTime(message.updated_at) }</span>
      </div>
      {
        showDropdown
        ? <Dropdown ref={ dropdownRef } position="right-6" items={ dropdownObject } />
        : ''
      }
    </div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.object.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default MessageBubble;