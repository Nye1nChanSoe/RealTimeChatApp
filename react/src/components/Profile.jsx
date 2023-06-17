import { useAuthContext } from "../contexts/AuthContext";
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import { HiOutlineX } from 'react-icons/hi';
import { HiOutlinePencil } from 'react-icons/hi';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import FullScreenImage from './FullScreenImage';
import axiosClient from '../axios-client';

const Profile = ({ imageSrc, setShowProfile }) => {
  const {user, setUser} = useAuthContext();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState('');
  const [loading, setLoading] = useState(false);

  const firstNameRef = useRef(null);
  const lastnameRef = useRef(null);
  const fileInputRef = useRef(null);
  const uploadedFileRef = useRef(null);

  const backdrop = 'fixed top-0 left-0 right-0 bottom-0 z-30 bg-black bg-opacity-60';
  const modal = 'w-80 p-8 bg-white shadow-md rounded-lg';
  const inputStyle = 'w-full border-b p-2 my-1 focus:outline-none focus:border-b-blue-500'

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);
    setCurrentProfileImage(imageSrc);
    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  const handleChange =  (e) => {
    uploadedFileRef.current = e.target.files[0];
    if(uploadedFileRef.current) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedFileRef.current);
      // preview image after file is read
      fileReader.onload = () => {
        setCurrentProfileImage(fileReader.result);
      };
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const payload = new FormData();

    if(uploadedFileRef.current) {
      payload.append('image', uploadedFileRef.current);
    }
    if(firstNameRef.current.value) {
      payload.append('firstname', firstNameRef.current.value);
    }
    if(lastnameRef.current.value) {
      payload.append('lastname', lastnameRef.current.value);
    }

    /**
     * Note: Cannot use multipart/form-data for the put method directly
     *       when using Laravel as a backend. But it is not a problem of
     *       Laravel or Symphony, it is a problem with PHP. PHP cannot
     *       parse multipart/form-data unless the request method is POST
     *
     * Solution: The solution is to add _method field with a value of
     *           HTTP verb, in this case PATCH or PUT method
     *           This approach override the actual HTTP method for the
     *           server to handle and support RESTful routing
     *
     * PHP's built-in $_POST superglobal array is populated only for POST requests
     * Laravel provide workarounds, such as using the _method field to simulate different HTTP methods
     * This workaround is specific to PHP and the server-side framework
     * 
     * https://stackoverflow.com/questions/50691938/patch-and-put-request-does-not-working-with-form-data
     * https://github.com/laravel/framework/issues/13457
     */
    payload.append('_method', 'PATCH');

    // check if the payload contains at least one key-value pair
    let isEmpty = true;
    for (const [key, val] of payload.entries()) {
      isEmpty = false;
      break;
    }

    if(!isEmpty) {
      try {
        const res = await axiosClient.post(`/users/${user.user_id}`, payload, {
          headers: {'Content-Type': 'multipart/form-data'}
        });
        if(res) {
          const {data} = res.data;
          setUser(data);
          console.log(data.image);
          setShowEdit(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      console.log('Empty field values, handle later');
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Escape') {
      setShowProfile(false);
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className={ backdrop }>
      <div className="flex items-center justify-center w-full h-full">
        <div className={ modal }>
          {
            showEdit
            ? <>
                <div className="w-full relative">
                  <HiOutlineChevronLeft
                    onClick={ () => setShowEdit(false) }
                    className="absolute left-0 top-0 w-5 h-5 text-gray-500 hover:text-blue-500"
                  />
                  <p className="text-lg text-center font-semibold">Edit Profile</p>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <div className="relative">
                    <div className="relative w-28 h-28 rounded-full border overflow-hidden bg-gray-100">
                      <label className="relative">
                        <img
                          src={ currentProfileImage }
                          className="w-full h-full object-cover"
                        />
                        <input ref={ fileInputRef } onChange={ handleChange } type="file" className="hidden" />
                        <div className="w-full h-1/3 absolute bottom-0 text-center text-sm pt-1 bg-gray-500 text-white bg-opacity-60 hover:bg-opacity-80">Upload</div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input ref={firstNameRef} type="text" defaultValue={user.firstname} className={ inputStyle } />
                    <input ref={lastnameRef} type="text" defaultValue={user.lastname} className={ inputStyle } />
                    {
                      !loading
                      ? <button
                          onClick={ handleSubmit }
                          type="button"
                          className="w-full mt-4 p-2 bg-blue-400 rounded-lg text-white hover:bg-blue-600"
                        >
                          Save
                        </button>
                      : <button disabled className="w-full mt-4 p-1.5 bg-blue-400 rounded-lg">
                          <div className='flex justify-center py-px'>
                            <div className='animation-spin'></div>
                          </div>
                        </button>
                    }
                  </div>
                </div>
              </>
            : <>
                <div className="w-full relative">
                  <HiOutlinePencil
                    onClick={ () => setShowEdit(true) }
                    className="absolute left-0 top-0 w-4 h-4 text-gray-500 hover:text-blue-500"
                  />
                  <p className="text-lg text-center font-semibold">Profile</p>
                  <HiOutlineX
                    onClick={ () => setShowProfile(false) }
                    className="absolute right-0 top-0 w-5 h-5 hover:text-blue-500"
                  />
                </div>
                <div className="flex flex-col items-center mt-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full border overflow-hidden bg-gray-100">
                      <img
                        onClick={ () => setIsFullScreen(true) }
                        src={ currentProfileImage }
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute bottom-1.5 right-3.5 w-2.5 h-2.5 ${ user.status === 'active' ? 'bg-green-400' : '' } rounded-full z-10`}></div>
                  </div>
                  <div className="mt-2">{ user.firstname + ' ' + user.lastname }</div>
                  <div className="mt-2">
                    <a href={`mailto:${user.email}`} className="underline hover:text-blue-500">{ user.email }</a>
                  </div>
                </div>
              </>
          }
        </div>
      </div>
      {
        isFullScreen &&
        <FullScreenImage
          setIsFullScreen={ setIsFullScreen }
          imageSrc={ imageSrc }
          isProfileImage={ true }
        />
      }
    </div>
  );
};

Profile.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  setShowProfile: PropTypes.func.isRequired,
};

export default Profile;