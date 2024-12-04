import React, { useState } from 'react';
import IndexNav from './indexNav';
import LoggerAction from './loginHandler';
import { Link } from 'react-router-dom';


const Login = () => { 
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const { logger, loading } = LoggerAction()
  const handleSubmit = async(e) => {
    e.preventDefault();
    await logger(loginData);
  };

  return (
      <div>
         <IndexNav />
         <div className='bdysupport'>
            <div className='logindiv'>
              <form onSubmit={handleSubmit}>
                <h2 className='hdlogin'>Login</h2>
                 <div className='formdivtxt'>
                  <label htmlFor='loginuser' className='labeltxt'>Username</label>
                  <input type="text" id='loginuser' name="username" placeholder="Email" onChange={handleChange} className='loginform' required />
                  </div>
                  <div className='formdivtxt'>
                   <label htmlFor='loginpass' className='labeltxt'>Password</label>
                   <input type="password" id='loginpass' name="password" placeholder="Password" onChange={handleChange} className='loginform' required />
                 </div>
                 <button type="submit" className='loginbutton' disabled={loading}>
                   {loading ? <div className='loader'></div> : "Log In"}
                 </button>
              </form>
             <p className='cpytxt'> Please click on <Link to='/register'>Register</Link> to register</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
