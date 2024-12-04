import { useAuthContext } from './AuthContext';



const Messageload = ({message}) => {
  const { authUser, select } = useAuthContext()
  if (!authUser) { window.location.href='./login' }

  const fromMe = message.senderId === authUser.user._id;
  const pix = fromMe ? authUser.user.profilePicture : select.profilePicture

  return (
    <div className={ fromMe ? 'msginputx' : 'msginput' }>
      <span className='msgload'>
        <img src={'http://localhost:5000/'+ pix } className='imgholdx' alt='img' /> 
        <p className='txtholda'>{message.message}</p>
      </span>
    </div>
  )
}

export default Messageload; 
