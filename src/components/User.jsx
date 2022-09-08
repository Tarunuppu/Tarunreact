import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setuserClick } from "./spaceslice";
import { useEffect } from "react";
import './Welcomestyles.css';
function User(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handledeleteuser(e){
        e.preventDefault();

        navigate('/welcome/deleteuser')
    }
    function handlecreateuser(e){
        e.preventDefault();
        navigate('/welcome/createuser')
    }
    async function handlegetuser(e){
        e.preventDefault();
        navigate('/welcome/getuser')
    }
    useEffect(()=>{
        dispatch(setuserClick(true));
        const unsetuserClick=()=>{
            dispatch(setuserClick(false));
        }
        return(unsetuserClick);
    },[])
    return(
        <div className="UserDiv">
            {
                    useSelector((state)=>state.userdetails.role).toLowerCase() === "admin" && 
                    <button className='UserButton' onClick={handledeleteuser} id="">
                        Get Users
                    </button>
                }
                {
                    useSelector((state)=>state.userdetails.role).toLowerCase() === "admin" && 
                    <button className='UserButton' onClick={handlecreateuser} id="">
                        Create User
                    </button>
                }
                {
                    useSelector((state)=>state.userdetails.role).toLowerCase() === "normal" && 
                    <button className='UserButton' onClick={handlegetuser} id="">
                        Get Users
                    </button>
                }
        </div>
    )
}
export default User;