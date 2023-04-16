import React from 'react';
import { useNavigate } from 'react-router';

const PageNotFound = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/');
  }, 1300);

  return (
    <div className="text-center">
      <h1>
      PageNotFound, redirecting to log in...
      </h1>
    </div>
  )
}

export default PageNotFound