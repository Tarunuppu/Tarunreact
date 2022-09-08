import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setmessage } from "./messageslice";
import { useNavigate } from "react-router-dom";
import { setname } from "./userslice";
import './Welcomestyles.css';
function Updateprofile(){
    const token = localStorage.access_token;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handlesubmit(e){
        e.preventDefault();
        axios.put('http://localhost:8000/api/update',{
            name:e.target.Name.value
        },{
            headers: { Authorization: 'Bearer '+ token}
        }).then((response)=>{
            dispatch(setname(e.target.Name.value));
            alert('Successfully Updated')
        }).catch((response)=>{
            alert('something went wrong');
        })
    }
    return(
        <div className="UpdateprofileDiv">
            <h1>Update Profile</h1>
            <form onSubmit={handlesubmit}>
                <input className="Welcometext" type="text" placeholder="New Name" name="Name" />
                <br />
                <input className="Welcomesubmit" type="submit" />
            </form>
        </div>
    )
};
export default Updateprofile;