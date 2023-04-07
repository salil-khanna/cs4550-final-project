import React from 'react'
import { useParams } from 'react-router-dom';
import SelfProfile from './SelfProfile';
import OtherProfile from './OtherProfile';

const ProfileSlug = () => {
  const { id } = useParams();

  const ourId = localStorage.getItem('id');
  const selfProfile = id === ourId;
  

  return (
    <div>
      {selfProfile ? 
        <SelfProfile />
      : 
        <OtherProfile />
      }
    </div>
  )
}

export default ProfileSlug