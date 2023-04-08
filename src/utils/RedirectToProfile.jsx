import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const RedirectToProfile = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    useEffect(() => {
      if (id !== null) {
        navigate('/profile');
      }
    }, [id, navigate]);
  return (
    <div></div>
  )
}

export default RedirectToProfile