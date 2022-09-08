import React from 'react';
//import {Link, Outlet} from "react-router-dom";
import jwt from 'jwt-decode'
import axios from "axios";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { setname } from './userslice';
import { setemail } from './userslice';
import { setmessage } from './messageslice';
import './LoginSignForgotstyles.css';

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handlesubmit(e){
        e.preventDefault();
        dispatch(setemail(e.target.EmailId.value));
        await axios.post("http://localhost:8000/api/login",{
            email: e.target.EmailId.value,
            password: e.target.Password.value
        }).then((response)=>{
            localStorage.setItem("access_token",response.data.access_token)
            // const user= jwt(response.data.access_token);
            // dispatch(setname(user.name));
            navigate('/welcome/profile');
        }).catch((response)=>{
            if(response.response.status===403){
                navigate('/notverified');
            }
            else if(response.response.status===401){
                alert("Wrong Credentials, Please try again");
            }
            else{
                dispatch(setmessage("Unknown Error"));
                navigate('/responsemessage');
            }
        });
        }
    return (
        <div className='Div-LSFLogin'>
        <form onSubmit={handlesubmit}>
            <h1>Login</h1>
            <input className='LSFtext' type={"text"} placeholder="Enter EmailId" name='EmailId'>
            </input>
            <br></br>
            <input className='LSFtext' type={"text"} placeholder="Enter Password" name='Password'>
            </input>
            <br></br>
            <input className='LSFsubmit' type={"submit"}>
            </input>
        </form>
        </div>
    );
}
export default Login;