import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setmessage } from "./messageslice";
import './Welcomestyles.css';
function Logout(){
    const token=localStorage.access_token;
    const dispatch=useDispatch();
    const navigate=useNavigate();
    function handleyes(e){
        e.preventDefault();
        axios.post('http://localhost:8000/api/logout',null,{
            headers: { Authorization: 'Bearer '+ token}
        }).then((response)=>{
            dispatch(setmessage(response.data.message));
            navigate('/responsemessage');
        }).catch((response)=>{
            alert('something went wrong');
        })
    }
    function handleno(e){
        e.preventDefault();
        navigate('/welcome');
    }
    return(
        <div className="LogoutDiv">
            <p>Are you sure you want to logout?</p>
            <button type="submit" name="YES" onClick={handleyes}>YES</button>
            <button type="submit" name="NO" onClick={handleno}>NO</button>
        </div>
    )
};
export default Logout;