import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const RedirectToLogin = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    useEffect(() => {
      if (id === null) {
        navigate('/login');
      }
    }, [id, navigate]);
  return (
    <div></div>
  )
}

export default RedirectToLogin