import React, { useState } from 'react';
import Navbar from './Navbar';
import NavBar from './navbar2';
import { useAuthContext } from './AuthContext';
import UpdateProfile from './editProfile';
import toast from 'react-hot-toast';

const Profile = ({ user }) => {
  const  { authUser } = useAuthContext()
  if (!authUser) { window.location.href='./login' }   
  const [image, setImage] = useState(null)
  const [editProfile, setEditProfile] = useState({  username: '', bio: '', password: '' })
  const [editMode, setEditMode] = useState();
  const { loading, postProfile } = UpdateProfile()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleUpdateProfile = async(e) => {
    e.preventDefault();
    if (editMode) {
      if (editProfile.password === '') {
        toast.error('Password field must not be empty');
        return;
      }

      /* functipon to update */
      postProfile(image, editProfile)
    }
    setEditMode(!editMode);
  };

  return (
    <div>
      <Navbar />
        <div className='bdysupport'>
        <NavBar />
        <div className='regdiv'>    
           <h2 className='hdlogin'>{authUser.user.username} 's Profile</h2>
              { editMode ? (
               <form id="form" encType='multipart/form-data' onSubmit={handleUpdateProfile}>
               <label htmlFor='profilePicture' className='labeltxt'>Upload Picture</label>
               <input type='file' name='profilePicture' onChange={(e)=>setImage(e.target.files[0])} className='loginupload' />
               <label htmlFor='username' className='labeltxt'> Username</label>
               <input type='text' name='username' placeholder='New Username' className='loginform' onChange={handleChange}  />
               <label htmlFor='password' className='labeltxt'> Password</label>
               <input type='password' name='password' placeholder='password' className='loginform' onChange={handleChange} />
               <label htmlFor='bio' className='labeltxt'>Biography</label>
               <textarea name='bio' className='textarea' onChange={handleChange}placeholder='Change Your Bio' /> 
               <button className='loginbutton'>
               {loading ? (<div className='loader'></div>) : 'Save'}
               </button>
               </form>
               ) : (
               <div>
                 <div className='picholdx'>
                   <img src={'http://localhost:5000/' + authUser.user.profilePicture} alt='img' className='imgfold' />
                 </div>
                 <form>
                 <label htmlFor='username' className='labeltxt'> Username</label>
                 <input type='text' name='username' placeholder='Edit Username' className='loginform' readOnly={true} value={authUser.user.username} />
                 <label htmlFor='bio' className='labeltxt'>Biography</label>
                 <textarea name='bio' className='textarea'value={authUser.user.bio} readOnly={true} />
                 <button onClick={handleUpdateProfile} className='loginbutton'>
                 Edit Profile
                 </button>
                 </form>
              </div>
              )}
          </div>
        </div>
      </div>
  );
};

export default Profile;
