import React, { useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import './Notverified.css';
function Notverified(){
    const [message,setmessage]= useState('Sorry, Your Email is not yet verified. Please check your Mail Box.');
    //const token = useSelector((state)=>state.token.value);
    const useremail=useSelector((stage)=>stage.userdetails.email);
    function handlebutton(e){
        axios.post("http://localhost:8000/api/email/request-verification",{
            email: useremail
        }
        ).then((response)=>{
            document.getElementById("resendbutton").style.display = "none";
            setmessage(response.data);
       });
    }

    return(
        <div className='NotverifiedDiv'>
            <h1 className='NotverifiedP'>
                {message}
            </h1>
            <button className='NotverifiedButton' onClick={handlebutton} id="resendbutton">
                Resend email for verification
            </button>
        </div>
    );
}

export default Notverified;