import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from './AuthContext';


const LoggerAction = () => {

  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext()

  const logger = async ({ username, password }) => {
    try {
      setLoading(true);
      const loggin = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
      });
      if (loggin) {
        const resp = await loggin.json();
          if (resp.error) {
           throw new Error(resp.error);
          }
        localStorage.setItem('authorized', JSON.stringify(resp));
        setAuthUser(resp);
        toast.success(resp.message);
      } else {
        toast.error('Failed to fetch data from server');
      }
    } catch(error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { logger, loading };
};

export default LoggerAction;
