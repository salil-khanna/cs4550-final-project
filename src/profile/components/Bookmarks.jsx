import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../../utils/UserCard';
import { toast } from 'react-toastify';
import DisplayThree from '../../utils/DisplayThree';

const Bookmarks = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        const filteredUsers = response.data.filter(
          (user) => user.username !== localStorage.getItem('user')
        ).map((user) => {
            user.key = user.username;
            return user;
          });

        setUsers(filteredUsers.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        toast.error('Error fetching bookmarks...');
      }
    };

    fetchUsers();
  }, []);
  

  return (
    <DisplayThree title="Bookmarks" data={users} CardComponent={UserCard} isLoading={isLoading}/>
  );
};

export default Bookmarks;
