import React from 'react';
import logo from '../logochat.png';
import { Link } from 'react-router-dom';

const IndexNav = () => {
  return(
    <div>
      <div className='navbar'>
        <div className='logo'>
          <img src={logo} alt='img' />
        </div>
        <div className='indexlink'>
          <div className='homelink'>
            <Link to='/login' className='link1'>Login</Link>
          </div>
          <div className='homelink'>
            <Link to='/register' className='link3'>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexNav;
