import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const RedirectToProfile = () => {
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    useEffect(() => {
      if (user_id !== null) {
        navigate('/profile');
      }
    }, [user_id, navigate]);
  return (
    <div></div>
  )
}

export default RedirectToProfile