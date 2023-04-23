import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookmarkCard from '../../utils/BookmarkCard';
import { toast } from 'react-toastify';
import DisplayThree from '../../utils/DisplayThree';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // get user_id and username from storage
  const user_id = localStorage.getItem('user_id');
  const username = localStorage.getItem('user');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookmarks/random/${user_id}/${username}`);
        const fixedData = response.data.map((bookmark) => {
            bookmark.key = bookmark.bookmark_id;
            return bookmark;
          });

        setBookmarks(fixedData);
        setIsLoading(false);
      } catch (error) {
        toast.error('Error fetching reviews...');
      }
    };

    fetchUsers();
  }, [user_id, username]);
  

  return (
    <DisplayThree title="Bookmarks" data={bookmarks} CardComponent={BookmarkCard} isLoading={isLoading}/>
  );
};

export default Bookmarks;
