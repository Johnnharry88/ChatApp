import React from 'react';
import IndexNav from './indexNav';
import backgrndimg from '../indexpic.png';
import logopics from '../logochat.png';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return( 
     <div>
    <div> 
      <IndexNav />
    </div>
  <div className='bdydisplay'>
  <div className='indexpic'>
    <img src={backgrndimg} alt='img' className='imgdiv' />
  </div>
  <div className='indexdiv'>
    <div className='logo2'>
      <img src={logopics} alt='img' />
    </div>
    <div className='indextext'>
     <div className='txt1'>
        <h1 className='indexhd'> Violi Chat App </h1>
        <h2 className='ptxtindex'> To link up with Friends Please click on the button below to login </h2>
     </div>
     <div className='indexbutton'>
        <button className='linkButton'>Here
           <Link to='/login'>click</Link>
        </button>
     </div>
    </div>
    </div>
   </div>
  </div>
  );
};

export default IndexPage;
