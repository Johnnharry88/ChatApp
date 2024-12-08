import { useEffect } from 'react';
import { useSockContext } from './SockContext';
import {  useAuthContext } from './AuthContext';

const ListenEvent = () => {
  const { sock } = useSockContext()
  const { messages, setMessages } = useAuthContext();

   useEffect(() => {
    sock?.on('emitMessage', (newMessage) => {
      setMessages([...messages, newMessage])
    })

    return () => sock?.off('amitMessage')
  },[sock, setMessages, messages])
}

export default ListenEvent;
