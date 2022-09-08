import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setname } from "./userslice";
import { setrole } from "./userslice";
import { setemail } from "./userslice";
import { useState } from "react";
import { setid } from "./userslice";
import { useDispatch } from "react-redux";
import Timeparttask from "./Timeparttask";
import { useSelector } from "react-redux";
// import Timelinepart from "./Timelinepart";
import ToMePie, { Allpie } from "./Pie";
import { ByMePie } from "./Pie";
import './Welcomestyles.css';

function Taskmanagement(){
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
    const handletimelineadmin=(e)=>{
        e.preventDefault();
        navigate('/timeline');
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
                            <button className='Taskmanagementsidebarbutton' onClick={handletimelineadmin} id="">
                                Time Line
                            </button>
                        }
                
                    </div>
                    <div className="Taskmanagementanalysis">
                        <ToMePie/>
                        <ByMePie/>
                    </div>
                    {userrole.toLowerCase() === 'admin' &&
                        <div className="TaskmanagementTimeline">
                            <Allpie/>
                        </div>
                    }
                    {userrole.toLowerCase() === 'normal' &&
                        <div className="TaskmanagementTimeline">
                            <Timeparttask url={'http://localhost:8000/task/get-tasks'}/>
                        </div>

                    }
                </div>
            }
        </div>
    )
}
export default Taskmanagement;