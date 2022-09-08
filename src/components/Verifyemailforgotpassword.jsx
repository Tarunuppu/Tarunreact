import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setmessage } from "./messageslice";
import { useNavigate } from "react-router-dom";
import './LoginSignForgotstyles.css'
function Verifyemailforgotpassword(){
    const { tokenvalue }=useParams();
    const disptach = useDispatch();
    const navigate= useNavigate();
    //console.log(tokenvalue);
    function handlesubmit(e){
        e.preventDefault();
        axios.post('http://localhost:8000/api/forgetpassword-emailverification',{
            token : tokenvalue,
            password: e.target.password.value
        }).then((response)=>{
            disptach(setmessage(response.data));
            navigate('/responsemessage');
        }).catch((response)=>{
            alert("something wrong happened");
        });
    }
    return(
        <div className="Div-Forgot">
            <h1>Please Enter the New Password</h1>
            <form onSubmit={handlesubmit}>            
                <input className="LSFtext" type={"password"} placeholder="password" name="password"></input>
                <br />
                <input className="LSFsubmit" type={"submit"}></input>
            </form>

        </div>
    )
}
export default Verifyemailforgotpassword;