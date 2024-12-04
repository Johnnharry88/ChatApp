import React from 'react';
import FetchUsers from './fetchAllUsers';
import { useAuthContext } from './AuthContext';

const Sidebar = () => {
  const { setSelect , authUser} = useAuthContext()
  const { loading, allusers } =  FetchUsers()

  if (!authUser) { window.location.href='./login '}
  return (
    <div className='Online'>
      <div className='contdiv'>
       {allusers.map((user)=> (
         <div key={user._id} className='onlinecont'>
           <div className='onlineref' onClick={()=>setSelect(user)}>
              <div className='pichold'>
                <img src={'http://127.0.0.1:5000/' + user.profilePicture} className='imgholda' alt='img' />
              </div>
              <div className='Userdisp'>
                {user.username} 
              </div>
           </div>
            <div className='divider'></div>
         </div>
         ))
        }
       {loading ? <div className='loader'></div> : null}
      </div>
    </div>
  );
};

export default Sidebar;
