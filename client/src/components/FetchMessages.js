import  { useAuthContext } from './AuthContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

const FetchMessages = () => {
  const { messages, setMessages, select } = useAuthContext()
  const [loading, setLoading] = useState(false);
  const sndMessage = async(message) => {
    if (select) {
      setLoading(true);
      try {
        const { token } = await JSON.parse(localStorage.getItem('authorized'));
        const res = await fetch(`http://localhost:5000/api/chat/send/${select._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ message })
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error);
        setMessages([...messages, data])
        console.log(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      throw new Error('Unable to fetch messages')
    }
  }
  return { loading, sndMessage }
}

export default FetchMessages;
