import { useSockContext } from './SockContext';
import { useAuthContext } from './AuthContext';

const Userbar = ({ user }) => {
  const { select , setSelect } = useAuthContext()
  const { online } = useSockContext()
  const selected = select?._id === user._id
  const onlineTrue = online.includes(user._id);

  return(
    <div>
      <div className='onlinecont'>
        <div className={ selected ? 'onlineref1' : 'onlineref'} onClick={()=>setSelect(user)}>
          <div className={ onlineTrue ? 'piconline' : 'pichold '}>
            <img src={'http://localhost:5000/' + user.profilePicture} className='imgholda' alt='img' />
          </div>
          <div className='Userdisp'>
            {user.username}
          </div>
        </div>
        <div className='divider'></div>
      </div>
    </div>
  );
}

export default Userbar;
