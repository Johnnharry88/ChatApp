import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from './AuthContext';

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext()
  let authuser = JSON.parse(localStorage.getItem('authorized'));
  const userId = authUser.user._id;
  const token = authUser.token;
  const postProfile = async(image, editProfile) => {
    const username = editProfile.username
    const password = editProfile.password
    const bio = editProfile.bio

    const formData = new FormData();
    formData.append("profilePicture", image)
    formData.append("username", username)
    formData.append("password", password)
    formData.append("bio", bio)

    setLoading(true);
    try {
      const postUpdate = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
        method:'PATCH',
        headers: {
          "Authorization" : `Bearer ${token}`,
        },
        body: formData
      });
      const data = await postUpdate.json();
      if (data.error) {
        throw new Error(data.error);
      }
      authuser.user = data.newUpdate;
      localStorage.setItem('authorized', JSON.stringify(authuser));
      setAuthUser(authuser);
      toast.success(data.message)
    } catch(err) {
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  };

  return { loading, postProfile }
}

export default UpdateProfile;
