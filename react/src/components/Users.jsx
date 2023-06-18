import { useEffect, useRef, useState } from "react";
import axiosClient from '../axios-client';
import UserBubble from "./UserBubble";
import { isEqual } from 'lodash';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const usersRef = useRef();
  const intervalRef = useRef();

  const pollInterval = 7000;

  useEffect(() => {
    initialize();
    pollUsersUpdate();

    return () => {
      if(intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  const pollUsersUpdate = () => {
    intervalRef.current = setInterval(() => {
      fetchUsers();
    }, pollInterval);
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get('/users');
      if(res) {
        const {data} = res.data;
        if(!isEqual(data, usersRef.current)) {
          setUsers(data);
          usersRef.current = data;
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const initialize = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/users');
      if(res) {
        const {data} = res.data;
        setUsers(data);
        usersRef.current = data;
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-4 h-20 border border-y px-6 w-full">
      {
        !loading 
          ? users.map((user, index) => <UserBubble key={index} user={user} />)
          : Array(12).fill().map((_, index) => 
              <div key={index} className='shrink-0 flex flex-col gap-y-2 items-center justify-center w-20 h-16'>
                <div className='shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-200 animate-pulse'>
                  <img src="" alt="" />
                </div>
                <div className='w-2/3 h-2 rounded-lg bg-gray-200 animate-pulse'></div>
              </div>
            )
      }
    </div>
  );
}

export default Users;