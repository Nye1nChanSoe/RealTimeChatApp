import { HiOutlineX } from 'react-icons/hi';
import { useErrorHandlingContext } from '../contexts/ErrorHandlingContext';
import { HiOutlineExclamation } from 'react-icons/hi';

const ErrorResponse = () => {
  const {errors, removeError} = useErrorHandlingContext();

  return (
    <div className="absolute top-4 left-1/2 translate-x-[175px] z-20 h-20 w-[512px] flex flex-col items-center gap-y-2.5">
      {
        errors.map((error, index) => 
          <div key={ index } className='w-full p-4 rounded-lg bg-red-600 text-white -translate-x-1/2'>
            <div className="flex items-start justify-between w-full gap-x-4">
              <div className='flex items-start gap-x-2'>
                <HiOutlineExclamation />
                <p className='text-sm'>{ error }</p>
              </div>
              <span><HiOutlineX onClick={ (e) => removeError(index) } className='cursor-pointer' /></span>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ErrorResponse;