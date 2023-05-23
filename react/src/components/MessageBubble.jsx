import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';
import { useMessageContext } from '../contexts/MessageContext';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';

const MessageBubble = ({ message, isSelf }) => {
  const {messages, setMessages} = useMessageContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const {conversationId} = useParams();

  const left = 'flex justify-start';
  const right = 'flex justify-end';

  const selfMessage = `max-w-lg p-3 cursor-pointer my-1.5 bg-blue-500 text-white rounded-xl`;
  const otherMessage = 'max-w-lg p-3 cursor-pointer my-1.5 bg-gray-100 text-black rounded-xl';

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    }
  }, []);

  const onDelete = async (e) => {
    try {
      setMessages(messages.filter((msg) => msg.message_id !== message.message_id));
      setShowDropdown(false);
      await axiosClient.delete(`/conversations/${conversationId}/messages/${message.message_id}`);
    } catch(error) {
      console.log(error);
    }
  };

  const onClickOutside = (e) => {
    if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(true);
  };

  const dropdownObject = {
    delete: onDelete,
  };

  return (
    <div className='w-full relative'>
      <div className={ isSelf ? right : left }>
        <p
          onDoubleClick={ (e) => isSelf ? handleDropdown(e) : '' }
          className={ isSelf ? selfMessage : otherMessage }
        >
          { message.content }
        </p>
      </div>
      {
        showDropdown
        ? <Dropdown ref={ dropdownRef } position="right-0" items={ dropdownObject } />
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