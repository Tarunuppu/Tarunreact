import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './Welcomestyles.css';
import { setprofileClick } from "./spaceslice";
function Profile(){
    const navigate = useNavigate();
    const name= useSelector((state)=>state.userdetails.name);
    const email= useSelector((state)=>state.userdetails.email);
    const role= useSelector((state)=>state.userdetails.role);
    const dispatch = useDispatch();
    const handleupdate=(e)=>{
        e.preventDefault();
        navigate('/welcome/updateprofile')
  
    }
    const handlepasswordchange=(e)=>{
        e.preventDefault();
        navigate('/welcome/updatepassword')
    }
    const handledelete=(e)=>{
        e.preventDefault();
        navigate('/welcome/delete')
  
    }
    useEffect(()=>{
        dispatch(setprofileClick(true));
        const unsetprofileClick=()=>{
            dispatch(setprofileClick(false));
        }
        return(unsetprofileClick);
    },[])
    return(
        <div className="ProfileDiv">
            <p>Name  : {name}</p>
            <p>EmailId  : {email}</p>
            <p>Role  : {role}</p>
            <button className='ProfileButton' onClick={handleupdate} id="">
                    Update Profile
            </button>
            <button className='ProfileButton' onClick={handlepasswordchange} id="">
                    Change Password
            </button>
            <button className='ProfileButton' onClick={handledelete} id="">
                    Delete Account
            </button>
        </div>
    )
}
export default Profile;