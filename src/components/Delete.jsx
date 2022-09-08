import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setmessage } from "./messageslice";
import './Welcomestyles.css';
function Delete(){
    const navigate = useNavigate();
    const token=localStorage.access_token;
    const dispatch = useDispatch();
    function handleyes(e){
        e.preventDefault();
        //console.log('Bearer '+ $token);
        axios.delete('http://localhost:8000/api/delete',{
            headers: { Authorization: 'Bearer '+ token}
        }).then((response)=>{
            //console.log(response.data);
            alert("Account Deleted");
            navigate('/');
        })
    }
    function handleno(e){
        e.preventDefault();
        navigate('/welcome');
    }
    return(
        <div className="DeleteDiv">
            <p>
                Are you sure you want to delete your account?
            </p>
            <button className="Welcomesubmit" type="submit" name="YES" onClick={handleyes}>YES</button>
            <button className="WelcomeDeleteSubmit" type="submit" name="NO" onClick={handleno}>NO</button>

        </div>
    )
};
export default Delete;