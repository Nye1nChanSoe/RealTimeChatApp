import { useRef, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import axiosClient, { cancelPendingRequest } from '../axios-client';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const { token } = useAuthContext();
  const searchTermRef = useRef();
  const searchInputRef = useRef();
  const cancelTokenRef = useRef();

  const searchBar = 'border pl-9 pr-2 py-2 w-full rounded-xl text-sm focus:outline-none focus:drop-shadow-md';
  const searchBarWithResults = 'border-t border-l border-r pl-9 pr-2 py-2 w-full rounded-t-xl text-sm focus:outline-none';

  const handleSearch = async () => {
    // cancel previous request if it exists
    if(cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Request cancelled');
    }

    // create new cancel token for current request
    cancelTokenRef.current = cancelPendingRequest();

    try {
      const res = await axiosClient.get(`/users?search=${searchTermRef.current}`, {
        cancelToken: cancelTokenRef.current.token,
      });

      if(res) {
        const {data} = res.data;
        setSearchResults(data);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    searchTermRef.current = e.target.value;
    if(e.target.value === '') {
      setSearchResults([]);
    } else {
      handleSearch();
    }
  };

  const createNewConversation = async (user) => {
    setSearchResults([]);
    searchInputRef.current.value = '';

    const payload = {
      'title': 'My conversation title',
      'participant_id': user.user_id,
    };

    try {
      const res = await axiosClient.post('/conversations', payload);
      if(res) {
        const {data} = res.data;
        navigate(`/chats/${data.conversation_id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative w-full px-6">
      <input
        ref={ searchInputRef }
        onChange={ handleChange }
        type="search" placeholder="Search..."
        className={ searchResults.length > 0 ? searchBarWithResults : searchBar }
      />
      <HiOutlineSearch className='absolute top-1/2 -translate-y-1/2 left-9 w-5 h-5 text-gray-500' />

      {/* search results */}
      {
        (searchResults.length > 0) &&
        <div className='relative w-full'>
          <div className='mx-6 border-t h-px'></div>
          <div className='absolute w-full max-h-40 py-2 overflow-y-auto border-l border-r border-b rounded-b-xl bg-white shadow-md'>
            {
              searchResults.map((result, index) =>
                <div key={index} onClick={ () => createNewConversation(result) } className='px-3 py-1.5 flex items-center gap-x-2 cursor-pointer hover:bg-gray-200'>
                  <div className='w-6 h-6 rounded-full overflow-hidden shrink-0'>
                    <img src={ `${import.meta.env.VITE_API_BASE_URL}/api/images/${result.user_id}/profile?token=${token}` } alt="" />
                  </div>
                  <p className='text-sm'>{result.firstname + ' ' + result.lastname}</p>
                </div>
              )
            }
          </div>
        </div>
      }
    </div>
  );
};

export default Search;