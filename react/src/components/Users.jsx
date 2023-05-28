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
        users.map((user, index) => <UserBubble key={index} user={user} />)
      }
    </div>
  );
}

export default Users;