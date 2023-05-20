import PropTypes from 'prop-types';

const MessageBubble = ({ name, message, isSelf }) => {
  const left = 'flex justify-start';
  const right = 'flex justify-end';

  const selfMessage = 'max-w-lg p-4 my-1.5 bg-blue-500 text-white rounded-xl';
  const otherMessage = 'max-w-lg p-4 my-1.5 bg-gray-100 text-black rounded-xl';

  return (
    <div className='w-full'>
      <div className={ isSelf ? right : left }>
        <p className={ isSelf ? selfMessage : otherMessage }>{ message }</p>
      </div>
    </div>
  );
};

MessageBubble.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default MessageBubble;