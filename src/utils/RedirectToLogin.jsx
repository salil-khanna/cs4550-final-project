import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const RedirectToLogin = () => {
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    useEffect(() => {
      if (user_id === null) {
        navigate('/login');
      }
    }, [user_id, navigate]);
  return (
    <div></div>
  )
}

export default RedirectToLogin