import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';

const SockContext = createContext();

export const useSockContext = () => {
  return useContext(SockContext);
}

export const SockContextProvider = ({ children }) => {
  const [sock, setSock] = useState(null);
  const [online, setOnline] = useState([]);
  const { authUser } = useAuthContext()

  useEffect(() => {
    if (authUser) {
      const sockt = io("http://localhost:5000", {
      query: {
          userID: authUser.user._id,
        },
      });
      setSock(sockt);

      sockt.on("fetchOnline", (users) => {
        setOnline(users);
      });
      return () => sockt.close();
    } else {
      if (sock) {
        sock.close();
        setSock(null);
      }
    }
    },[authUser]);
  
  return (
    <SockContext.Provider value={{sock, online}}>
      { children  }
    </SockContext.Provider>
  )
}
