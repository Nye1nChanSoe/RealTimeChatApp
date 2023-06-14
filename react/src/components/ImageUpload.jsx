import { useRef } from 'react';
import { HiOutlinePaperClip } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useMessageContext } from '../contexts/MessageContext';
import { useErrorHandlingContext } from '../contexts/ErrorHandlingContext';

const ImageUpload = () => {
  const {messages, setMessages} = useMessageContext();
  const {addError} = useErrorHandlingContext();
  const {conversationId} = useParams();
  const inputFileRef = useRef();

  const handleChange = (e) => {
    if(e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('image', image);
      formData.append('content', image.name);

      handleFileUpload(formData);

      // Change event by default doesn't trigger if the same image is uploaded
      // So we need to clear the input value
      inputFileRef.current.value = '';
    }
  };

  const handleFileUpload = async (payload) => {
    try {
      const res = await axiosClient.post(`/conversations/${conversationId}/messages`, payload, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
      if(res) {
        const {data} = res.data;
        setMessages([...messages, data]);
      }
    } catch (error) {
      if(error && error.response.status === 422) {
        addError('File size too large');
      } else {
        addError(error.message);
      }
    }
  };

  return (
    <div className='w-5 h-5'>
      {
        conversationId
        ? <div>
            <label>
              <input 
                ref={inputFileRef}
                type="file"
                onChange={handleChange}
                className='hidden'
              />
              <HiOutlinePaperClip className='w-full h-full hover:text-blue-500' />
            </label>
          </div>
        : <HiOutlinePaperClip className='w-full h-full text-gray-400' />
      }
    </div>
  );
};

export default ImageUpload;