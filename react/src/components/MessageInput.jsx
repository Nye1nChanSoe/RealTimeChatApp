import { HiOutlinePaperClip } from 'react-icons/hi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { HiOutlinePaperAirplane } from 'react-icons/hi';

const MessageInput = () => {
  return (
    <div className="h-24">
      <div className='flex items-center px-6 h-full'>
        <div className='relative w-full h-14'>
          <textarea placeholder="write something" className="w-full h-full resize-none pt-4 pl-2.5 pr-14 overflow-hidden rounded-xl border border-gray-400 focus:outline-none"></textarea>
          <div className='absolute right-2 top-1/2 -translate-y-1/2 bg-blue-200 rounded-xl px-2.5 py-2 hover:bg-blue-300'>
            <HiOutlinePaperAirplane className='w-5 h-5 rotate-45' />
          </div>
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