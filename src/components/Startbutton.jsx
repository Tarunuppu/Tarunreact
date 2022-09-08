import React from "react";
import { Outlet } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import './Startbuttonstyles.css';
function Startbutton(){
    const navigate = useNavigate();
    const token = localStorage.access_token;
    function handlelogin(e){
        e.preventDefault();
        navigate('/login');
    }
    function newuser(e){
        e.preventDefault();
        navigate('/signup');
    }
    function forgetpassword(e){
        e.preventDefault();
        navigate('/forgetpassword');
    }
    return(
        <div>
            {
                token && <Navigate to="/welcome/profile" replace={true} /> 
            }
        <div>
            <h1 className="Heading">Welcome</h1>
        </div>
        <div className="Button-Div">
            <button className="Button" onClick={handlelogin}>
                Login
            </button>
            <button className="Button" onClick={newuser}>
                Sign Up?
            </button>
            <button className="Button" onClick={forgetpassword}>
                Forget Password?
            </button>
        </div>
        <Outlet/>
        </div>
    )
}
export default Startbutton;