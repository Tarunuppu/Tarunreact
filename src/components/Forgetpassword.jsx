import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setmessage } from './messageslice';
import { useNavigate } from 'react-router-dom';
import './LoginSignForgotstyles.css';
function Forgetpassword(){
    const dispatch= useDispatch();
    const navigate= useNavigate();
    function handlesubmit(e){
        e.preventDefault();
        axios.post('http://localhost:8000/api/forgetpassword',{
            email: e.target.EmailId.value
        }).then((response)=>{
            dispatch(setmessage(response.data));
            navigate('/responsemessage');
        }).catch((response)=>{
            alert('something is wrong');
        });
    }
   return(
        <div className='Div-LSFForgot'>
            <h1>Forget Password</h1>
            <form onSubmit={handlesubmit}>
                <input className='LSFtext' type={"text"} placeholder="Enter EmailId" name='EmailId'></input>
                <br />
                <input className='LSFsubmit' type={"submit"}></input>
            </form>
        </div>
   );
}
export default Forgetpassword; 