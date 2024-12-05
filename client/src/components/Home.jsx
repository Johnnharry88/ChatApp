import React from 'react';
import Navbar from './Navbar';
import NavBar from './navbar2';
import Sidebar from './sideBar';
import { useState } from 'react'; 
import { useAuthContext } from './AuthContext';
import Nochat from './nochat';
import FetchMessages from './FetchMessages.js';
import GetAllMessages from './getMessages';
import FirstMsg from './firstMsg';
import Messageload from './MessageLoader';


const Home = () => {
  const date =  new Date().getFullYear()
  const [message, setMessage] = useState('');
  const { select, authUser } = useAuthContext()
  const { loading, sndMessage } = FetchMessages()
  const { messages, loader } = GetAllMessages()

  if (!authUser) { window.location.href ='./login' }
  // Function that handles sending message
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!message || !select) { return; }
    await sndMessage(message);
    setMessage('');
  }

  return (
    <div>
      <Navbar />
        <div className='bdysupport'>
          <NavBar />
          <Sidebar />
            <div className='messagediv'>
              { !select ? (
                 <Nochat />
               ) : (
                 <div className='Homebg'>
                   <div  className='hdcont'>   
                      <h2 className='hdtitle'>{select.username}</h2>
                   </div>
                   <div className='msgediv'>
                     { !loader && messages.length === 0 && (<FirstMsg /> )} 
                     { loader && (<div className='loader'></div>) }
                     { !loader && messages.length > 0 && messages.map((mes) => ( 
                       <Messageload key={mes._id} message={mes} />  
                     ))}
                   </div>
                   <div>
                     <input type='text' className='sendmsg'
                     placeholder='Type a message' value={message} 
                     onChange={(e) => setMessage(e.target.value)}
                    />
                    <button  className='sndbutton' onClick={handleSubmit}>
                      {loading ? <div className='loader'></div> : 'Send' }
                    </button>
                  </div>
                </div>
              )}
            <div><p className='cpytxt'>Copyright &copy; {date}</p></div>
         </div>
       </div>
     </div>
  );
}

export default Home;
