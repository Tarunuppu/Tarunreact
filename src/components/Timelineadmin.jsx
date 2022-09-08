import React from "react";
import './Welcomestyles.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setname } from "./userslice";
import { setrole } from "./userslice";
import { setemail } from "./userslice";
import { setid } from "./userslice";
import Timeparttask from "./Timeparttask";


function Timelineadmin(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [temp, settemp] = useState(true);
    const token = localStorage.access_token;
    const userrole = useSelector((state)=>state.userdetails.role);
    const handleprofile=(e)=>{
        e.preventDefault();
        navigate('/welcome/profile');
    }
    const handleuser=(e)=>{
        e.preventDefault();
        navigate('/welcome/user');
    }
    const handletask=(e)=>{
        e.preventDefault();
        navigate('/welcome/task');
    }
    const handletaskmanagement=(e)=>{
        e.preventDefault();
        navigate('/taskmanagement');
    }
    useEffect(()=>{
        axios.post('http://localhost:8000/api/user-profile',null,{
                headers: { Authorization: 'Bearer '+ token}
        }).then((response)=>{
                dispatch(setname(response.data.name));
                dispatch(setrole(response.data.role));
                dispatch(setemail(response.data.email));
                dispatch(setid(response.data.id));
                settemp(false);
        })
    },[]);
    return(
        <div style={{height : "100%"}}>
            { temp ? <p>loading...</p> :
                 <div style={{height : "100%"}}>
                    <div className="Taskmanagementsidebar">
                        <button className='Taskmanagementsidebarbutton' onClick={handleprofile} id="">
                            Profile
                        </button>
                
                
                        <button className='Taskmanagementsidebarbutton' onClick={handleuser} id="">
                            Users
                        </button>
                
                
                        <button className='Taskmanagementsidebarbutton' onClick={handletask} id="">
                            Tasks
                        </button>
                        {userrole.toLowerCase() === 'admin' && 
                            <button className='Taskmanagementsidebarbutton' onClick={handletaskmanagement} id="">
                                Task Management
                            </button>
                        }
                
                    </div>
                    <div className="TaskmanagementTimeline">
                        <h3 >All Tasks Time Line</h3>
                        <Timeparttask url='http://localhost:8000/task/all-tasks'/>
                    </div>
                    <div className="TaskmanagementTimeline">
                        <h3>My Tasks Time Line</h3>
                        <Timeparttask url='http://localhost:8000/task/get-tasks'/>
                    </div>
                </div>
            }
        </div>
    )
}
export default Timelineadmin;