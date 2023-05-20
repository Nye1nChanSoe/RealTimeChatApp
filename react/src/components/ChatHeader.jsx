import PropTypes from 'prop-types';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const ChatHeader =({ data }) => {
  return (
    <header className='flex items-center justify-between h-20 sticky top-0 z-10 bg-white'>
      <div className='flex items-center gap-x-5'>
        <div className='shrink-0 w-12 h-12 overflow-hidden rounded-full bg-gray-100'>
          <img src="" alt="" />
        </div>
        <div className='w-52'>
          <h1 className='truncate'>Kyle, John Doe, Austin</h1>
        </div>
      </div>
      <div className='flex items-center gap-x-5'>
        <HiOutlineVideoCamera className='w-5 h-5' />
        <HiOutlinePlusSm className='w-5 h-5' />
        <HiOutlineDotsVertical className='w-5 h-5' />
      </div>
    </header>
  );
};

ChatHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ChatHeader;