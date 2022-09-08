import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setmessage } from "./messageslice";
import { useNavigate } from "react-router-dom";
import './Notverified.css'
function Verifyemail(){
    const { tokenvalue }=useParams();
    const disptach = useDispatch();
    const navigate= useNavigate();
    //console.log(tokenvalue);
    function handleclick(){
        axios.post('http://localhost:8000/api/email/verify',{
            token : tokenvalue,
        }).then((response)=>{
            disptach(setmessage(response.data));
            navigate('/responsemessage');
        }).catch((response)=>{
            alert("something wrong happened");
        });
    }
    return(
        <div className="NotverifiedDiv">
            <h1 className="NotverifiedP">Just one more click</h1>
            <button className="NotverifiedButton" onClick={handleclick}>
                verify
            </button>
        </div>
    )
}
export default Verifyemail;