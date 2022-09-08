import axios from "axios";
import React, { useState } from "react";
import './Welcomestyles.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";
function Createtask(){
    const [title, settitle]= useState(null);
    const [description, setdescription]= useState(null);
    const [assignee, setassignee]= useState(null);
    const [duedate, setduedate]= useState(new Date());
    const [status, setstatus]= useState(null);
    const token = localStorage.access_token;
    const createdBy = useSelector((state)=>state.userdetails.email);
    const userrole = useSelector((state)=>state.userdetails.role);
    const navigate = useNavigate();
    function handleadd(e){
        e.preventDefault();
        //console.log(duedate);
        axios.post('http://localhost:8000/task/create-tasks',{
            title : title,
            description : description,
            assignee : assignee,
            createdby : createdBy,
            duedate : duedate,
            status : 'assigned'
        },{
            headers : {Authorization : 'Bearer ' + token}
        }).then((response)=>{
            alert(response.data);
        })
    }
    function handlealltasks(e){
        e.preventDefault();
        navigate('/welcome/alltasks');
    }
    return(
        <div className="CreatetaskDIV">
            <h1 style={{color:"Grey", textAlign: "center"}}>Create Task</h1>
            <div className="CreatetaskDiv">
            <input className="Createtaskfiveinputs" type="text" name="title" onChange={e=>settitle(e.target.value)} placeholder="Title" required></input>
            <input className="Createtaskfiveinputs" type="text" onChange={(e)=>{setassignee(e.target.value)}} placeholder="Assignee"></input>
            {/* <input className="Createtaskfiveinputs" type="text" onChange={(e)=>{setcreatedby(e.target.value)}} placeholder="Createdby"></input> */}
            {/* <input className="Createtaskfiveinputs" type="text" onChange={(e)=>{setduedate(e.target.value)}} placeholder="Duedate"></input> */}
            {/* <input className="Createtaskfiveinputs" type="text" onChange={(e)=>{setstatus(e.target.value)}} placeholder="Status"></input> */}
            <div className="CreatetaskDatePicker">
            <DatePicker className="Createtaskfiveinputs" selected={duedate} onChange={(date) => setduedate(date)} showTimeSelect/>
            </div>
            </div>
            <div className="CreatetaskDiv">
            <textarea className="Createtaskoneinput" type="text" onChange={(e)=>{setdescription(e.target.value)}} rows="4" cols="100" placeholder="Description"></textarea>
            </div>
            <div className="CreatetaskDiv">
            <input className="Createtasksubmit" type="submit" onClick={handleadd} value={"add"}></input>
            </div>
            <div style={{display:"flexi",justifyContent : "center"}}>
            {userrole.toLowerCase() === 'admin' && <button className="TaskButton" onClick={handlealltasks}>All Tasks</button>}
            </div>
        </div>
    );
}
export default Createtask;