import PropTypes from 'prop-types';

const Chat = ({ data }) => {
  return (
    <div className='flex items-center space-x-3 px-6 py-4 hover:bg-gray-100'>
      <div className='shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100'>
        <img src="" alt="" />
      </div>
      <div className='flex-1 overflow-hidden'>
        <h1 className='font-semibold'>{ data.participants[0] }</h1>
        <p className='truncate'>{ data.message }</p>
      </div>
      <div className='self-start'>
        <time className='text-sm text-gray-500'>{ data.timestamp }</time>
      </div>
    </div>
  );
};

Chat.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Chat;