import { useEffect, useState } from "react";
import axiosClient from '../axios-client';
import UserBubble from "./UserBubble";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/users');
      if(res) {
        const {data} = res.data;
        setUsers(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // TODO: Polling here

  return (
    <div className="flex items-center gap-x-4 h-20 border border-y px-6 w-full">
      {
        !loading 
          ? users.map((user, index) => <UserBubble key={index} user={user} />)
          : Array(12).fill().map((_, index) => 
              <div key={index} className='shrink-0 flex flex-col gap-y-2 items-center justify-center w-20 h-16'>
                <div className='shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100 animate-pulse'>
                  <img src="" alt="" />
                </div>
                <div className='w-2/3 h-2 rounded-lg bg-gray-100 animate-pulse'></div>
              </div>
            )
      }
    </div>
  );
}

export default Users;