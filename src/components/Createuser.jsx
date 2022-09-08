import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import './Welcomestyles.css'
function Createuser(){
    const token=localStorage.access_token;
    const By = useSelector((state)=>state.userdetails.name);
    function generatepassword(){
        var temp_password="";
        var allcaps= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var allsmalls= 'abcdefghijklmnopqrstuvwxyz';
        var nums= '0123456789';
        var specials = '@$!%*#?&';
        var allcharacters = allcaps + allsmalls + nums + specials ;
        var temp;
        for (let i=0;i<4 ; i++){
            temp = Math.floor(Math.random() * (allcharacters.length));
            temp_password += allcharacters[temp];
        }
        temp= Math.floor(Math.random() * (allcaps.length));
        temp_password+= allcaps[temp];
        temp = Math.floor(Math.random() * (allsmalls.length));
        temp_password+=allsmalls[temp];
        temp = Math.floor(Math.random() * (nums.length));
        temp_password+=nums[temp];
        temp = Math.floor(Math.random() * (specials.length));
        temp_password+=specials[temp];
        return temp_password;
    }
    async function handlesubmit(e){
        //console.log(name)
        e.preventDefault();
        const temopass = generatepassword();
        axios.post("http://localhost:8000/api/users",{
            name : e.target.Name.value,
            email: e.target.EmailId.value,
            password: temopass,
            role : e.target.Role.value,
            created_by : By
        },{
            headers: { Authorization: 'Bearer '+ token}
        }).then((response)=>{
            console.log(response.data);
        }).catch((response)=>{
           console.log(response.data);
        });
    }
    return(
        <div className="CreateuserDiv">
            <h1>Create User</h1>
            <form onSubmit={(e) => handlesubmit(e)}>
                <input className="Welcometext" type={"text"} placeholder="Enter Name" name='Name'></input>
                <br></br>
                <input className="Welcometext" type={"email"} placeholder="Enter EmailId" name='EmailId'></input>
                <br></br>
                <input className="Welcometext" type={"text"} placeholder="Enter Role" name='Role'></input>
                <br></br>
                <input className="Welcomesubmit" type={"submit"} ></input>
            </form>
        </div>
    )
}
export default Createuser;