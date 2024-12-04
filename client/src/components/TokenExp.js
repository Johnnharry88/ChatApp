import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const TokenExp = (token) => {
  if (!token) return true;
  try {
     const decodedToken = jwtDecode(token);
     const currentTime = Date.now() / 1000;
     return decodedToken.exp < currentTime;
  } catch (err) {
    toast.error('Error decodeing token', err);
    return true;
  }
  return false
}

export default TokenExp;
