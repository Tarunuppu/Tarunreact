import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LoginSignForgotstyles.css'
//import { useSelector } from 'react-redux';
import {setmessage} from './messageslice';
function Signup(){
    const navigate= useNavigate();
    const dispatch = useDispatch();
    function handlesubmit(e){
        e.preventDefault();
        //console.log(e.target.Password.value);
        axios.post("http://localhost:8000/api/users",{
            name: e.target.Name.value,
            email: e.target.EmailId.value,
            password: e.target.Password.value
        }).then((response)=>{
            dispatch(setmessage("successfully registered. An email is send to your mailId, Please verify it before login"));
            navigate('/responsemessage');
        }).catch((response)=>{
            alert(
                "Please check the password format and Email must be unique"
            )
        })
    }
   return(
        <div className='Div-LSFSignup'>
            <h1>Sign Up</h1>
            <form onSubmit={handlesubmit}>
                <input className='LSFtext' type={"text"} placeholder="Enter Name" name='Name'></input>
                <br></br>
                <input className='LSFtext' type={"email"} placeholder="Enter EmailId" name='EmailId'></input>
                <br></br>
                <input className='LSFtext' type={"password"} placeholder="Enter Password" name='Password'></input>
                <br></br>
                <input className='LSFsubmit' type={"submit"} ></input>
            </form>
        </div>
   );
}
export default Signup; 