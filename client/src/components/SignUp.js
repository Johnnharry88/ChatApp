import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [ loading, setLoading ] = useState(false);

  const signup = async ({ email, username, password, bio }) => {
    setLoading(true);
    try {
      const sendUser = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, bio })
      });
      const user = await sendUser.json();
      if (user.error) {
        throw new Error(user.error);
      }
      toast.success(user);
    } catch(error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };

};

export default Register;
