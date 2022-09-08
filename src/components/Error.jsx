import React from 'react';
import { useSelector } from 'react-redux';
import './Errorstyles.css'
function Error(){
    const message=useSelector((state)=>state.message.value);
    return(
        <h1 className='ErrorDiv'>
            {message}
        </h1>
    );
}
export default Error;