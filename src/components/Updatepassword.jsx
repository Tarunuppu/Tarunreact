import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setmessage } from "./messageslice";
import { useNavigate } from "react-router-dom";
import './Welcomestyles.css';
function Updatepassword(){
    const token=localStorage.access_token;
    const emailid= useSelector((state)=>state.userdetails.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handlesubmit(e){
        e.preventDefault();
        if(e.target.Newpassword.value !== e.target.RNewpassword.value){
            alert("Error")
            navigate('/welcome/updatepassword');
        }
        else{
            axios.put('http://localhost:8000/api/passwordchange',{
                email: emailid,
                password: e.target.Currentpassword.value,
                newpassword: e.target.Newpassword.value
            },{
                headers: { Authorization: 'Bearer '+ token}
            }).then((response)=>{
                alert('Password Updated');
            }).catch((response)=>{
                alert('something went wrong');
            });
        }
    }
    return(
        <div className="UpdatepasswordDiv">
            <h1>Change Password</h1>
            <form onSubmit={handlesubmit}>
                <input className="Welcometext" type="text" placeholder="Current password" name="Currentpassword"/>
                <br />
                <input className="Welcometext" type="text" placeholder="New Password" name="Newpassword" />
                <br />
                <input className="Welcometext" type="text" placeholder="Rewrite Password" name="RNewpassword" />
                <br />
                <input className="Welcomesubmit" type="submit" />
            </form>
        </div>
    )
};
export default Updatepassword;