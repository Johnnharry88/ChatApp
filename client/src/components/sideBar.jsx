import React from 'react';
import Userbar from './UsersBar.jsx';
import FetchUsers from './fetchAllUsers';
import { useAuthContext } from './AuthContext';

const Sidebar = () => {
  const { authUser} = useAuthContext()
  const { loading, allusers } =  FetchUsers()


  if (!authUser) { window.location.href='./login' }
  if (!allusers) { return; }
  return (
    <div className='Online'>
      <div className='contdiv'>
        { !loading && allusers.length > 0 && allusers.map((user) => (
          <Userbar key={user._id} user={user} />
         ))
        }
       {loading ? <div className='loader'></div> : null}
      </div>
    </div>
  );
};

export default Sidebar;
