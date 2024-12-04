import { useAuthContext } from './AuthContext';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import TokenExp from './TokenExp';

const GetAllMessages = () => {
  const { authUser, setAuthUser, messages, setMessages, select } = useAuthContext();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getMsgs = async() => {
      setLoader(true);
      try {
        const token = authUser.token
        if (token) {
          const Expire = TokenExp(token)
          if (Expire) {
            localStorage.removeItem('authorized');
            setAuthUser(null);
            toast.error('Session Time Out, Login agin to continue');
          }
        }

        const resp = await fetch(`http://localhost:5000/api/chat/message/${select._id}`, {
          headers: { "Authorization" : `Bearer ${token}` }
        });
        const data = await resp.json();
        if (data.error) { throw new Error(data.error) };
        setMessages(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoader(false);
      }
    }
  if (select?._id) getMsgs()
  },[select?._id, setMessages, authUser, setAuthUser])

  return { messages, loader };
}

export default GetAllMessages;
