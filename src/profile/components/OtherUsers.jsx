import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../../utils/UserCard';
import { toast } from 'react-toastify';
import DisplayThree from '../../utils/DisplayThree';
import AppContext from '../../AppContext';

const OtherUsersDisplay = ({remove}) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${AppContext.link}/users`);
        const filteredUsers = response.data.filter(
          (user) => user.username !== localStorage.getItem('user') && user.username !== remove
        ).map((user) => {
            user.key = user.username;
            return user;
          });

        setUsers(filteredUsers.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        toast.error('Error fetching other profiles...');
      }
    };

    fetchUsers();
  }, [remove]);
  

  return (
    <DisplayThree title="Other Profiles" data={users} CardComponent={UserCard} isLoading={isLoading}/>
  );
};

export default OtherUsersDisplay;
