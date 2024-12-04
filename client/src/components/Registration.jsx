import React, { useState } from 'react';
import IndexNav from './indexNav';
import Register from './SignUp.js';


const Registration = () => {
  const [formData, setFormData] = useState({ email: '', username: '', password: '', bio: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const { loading, signup } = Register()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const reg = await signup(formData);
    if (!reg) {
      window.location.reload()
    }
    window.location.href='/login';
  };

return (
        <div>
        <IndexNav />
        <div className='bdysupport'>
        <div className='regdiv'>
        <form onSubmit={handleSubmit}>
            <h2 className='hdlogin'>Register</h2>
           <div className='formdivtxt'>
	    <label htmlFor='email' className='labeltxt'> Email</label>
            <input type='text' id='email' name='email' placeholder='Email' onChange={handleChange} className='loginform' required />
            </div>
            <div className='formdivtxt'>
            <label htmlFor='username' className='labeltxt'>Username</label>
            <input type="text" id='username' name="username" placeholder="Username" onChange={handleChange} className='loginform' required />
            </div>
            <div className='formdivtxt'>
            <label htmlFor='password 'className='labeltxt'>Password</label>
            <input type="password" id='password' name="password" placeholder="Password" onChange={handleChange} className='loginform' required />
            </div>
            <div className='formdivtxt'>
            <label htmlFor='bio' className='labeltxt'>Biography</label>
            <textarea name="bio" id='bio' className='textarea' placeholder="Add a short bio..." onChange={handleChange}></textarea>
            </div>
            <button type="submit" className='loginbutton' disabled={loading}>
               {loading ? <div className='loader'></div> : "Register"}</button>
        </form>
       </div>
      </div>
        </div>
    );
};

export default Registration;
