import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
}
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authorized')) || null)
  const [messages, setMessages] = useState('');
  const [select, setSelect] = useState(null);
  return <AuthContext.Provider value={{authUser, setAuthUser, messages, setMessages, select, setSelect}}>
    {children}
    </AuthContext.Provider>;
}
