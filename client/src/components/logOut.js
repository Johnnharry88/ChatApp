import { useAuthContext } from './AuthContext';
import toast from 'react-hot-toast';

const LogOut = () => {
  const { setAuthUser } = useAuthContext();
  const logoutfxn = () => {
    try {
        localStorage.removeItem('authorized');
        setAuthUser(null);
        toast.success('Logged Out successfully. Bye');
    } catch (error) {
      toast.error(error)
    }
  }
return { logoutfxn };
}

export default LogOut;
