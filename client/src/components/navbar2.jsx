import React from 'react';
import LogOut from './logOut';
import { CiLogout } from "react-icons/ci";
import { useAuthContext } from './AuthContext';

const NavBar = () => {
  const { logoutfxn } = LogOut()
  const handleLogout = () => {
    logoutfxn();
    window.location.href='/login';
  };
  const { authUser, setAuthUser } = useAuthContext()
  if (!authUser) { setAuthUser(null) }
  return (
    <div>
      <div className='navbar2'>
        <div>
          <div className='navbuttom'>
            <div className='profpics'>
               <img src={'http://localhost:5000/'+ authUser.user.profilePicture } alt='img' className='imgholda' />        
            </div>
         </div>
        <div className='navbuttom'>
          <div onClick={handleLogout} className='iconbuttom'>
            < CiLogout className='imgcontx' /> 
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default NavBar;
