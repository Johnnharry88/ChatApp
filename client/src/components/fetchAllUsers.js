import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from './AuthContext';
import TokenExp from './TokenExp';


const FetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [allusers, setAllusers]  = useState([]);
  const { authUser, setAuthUser } = useAuthContext()

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = authUser.token
        if (token) {
          const Expire = TokenExp(token);
          if (Expire) {
            localStorage.removeItem('authorized')
            setAuthUser(null);
            toast.error('Session time out, please login to continue');
          }
        }
        const comm = await fetch('http://localhost:5000/api/chat/all', {
          headers: {"Authorization": `Bearer ${token}` }
        });
        const resp = await comm.json();
        if (resp.error) {
          throw new Error(resp.error);
        }
        setAllusers(resp);
      } catch (error) {
       toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  },[authUser, setAuthUser]);
  return { loading, allusers }
}

export default FetchUsers;
