import React from 'react'
import { useParams } from 'react-router-dom';
import OtherProfile from './components/OtherProfile';
import RedirectToProfile from '../utils/RedirectToProfile';

const ProfileSlug = () => {
  const { user } = useParams();

  const ourUser = localStorage.getItem('user');
  const selfProfile = user === ourUser;

  return (
    <div>
      {selfProfile ? 
        <RedirectToProfile />
      : 
        <OtherProfile username={user} />
      }
    </div>
  )
}

export default ProfileSlug