import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

const RedirectToLogin = () => {
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      if (user_id === null) {
        navigate('/login', { state: { from: location } });
      }
    }, [user_id, navigate, location]);
  return (
    <div></div>
  )
}

export default RedirectToLogin