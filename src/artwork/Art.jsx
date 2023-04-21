import React from 'react'
import { useParams } from 'react-router-dom';

const Art = () => {
  const { art_id } = useParams();
  const user_id = localStorage.getItem('user_id');
  return (
    <div>Art Number {art_id}</div>
  )
}

export default Art