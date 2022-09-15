import React, { useState } from "react";
//import { useState } from 'react';
//import { useSelector } from 'react-redux';
import axios from "axios";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setname } from "./userslice";
import { setid } from "./userslice";
import { setallusers, setemail, setrole } from "./userslice";
import { setmessage } from "./messageslice";
import { useEffect } from "react";
import Notifications from "./Notifications";
import Pusher from "pusher-js";
import "./Welcomestyles.css";
import { getType } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";

function Welcome() {
  //const $token=useSelector((state)=>state.token.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [temp, settemp] = useState(true);
  const [show, setshow] = useState(false);
  const [pusheremail, setpusheremail] = useState("");
  const token = localStorage.access_token;

  const handleprofile = (e) => {
    e.preventDefault();
    navigate("/welcome/profile");
  };

  const handleuser = (e) => {
    e.preventDefault();
    navigate("/welcome/user");
  };

  const handletask = (e) => {
    e.preventDefault();
    navigate("/welcome/task");
  };

  const handletaskmanagement = (e) => {
    e.preventDefault();
    navigate("/welcome/taskmanagement");
  };

  const handlelogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const handleNotifications = (e) => {
    e.preventDefault();
    if (show === true) setshow(false);
    else setshow(true);
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/user-profile", null, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        dispatch(setname(response.data.name));
        dispatch(setrole(response.data.role));
        dispatch(setemail(response.data.email));
        dispatch(setid(response.data.id));
        setpusheremail(response.data.email);
        settemp(false);
      })
      .catch((response) => {
        localStorage.removeItem("access_token");
        navigate("/");
      });
  }, []);
  Pusher.logToConsole = true;

  var pusher = new Pusher("20592192baa0019cf044", {
    cluster: "ap2",
  });
  console.log(pusheremail);
  console.log("hello brother");
  console.log(typeof pusheremail);
  var channel = pusher.subscribe(pusheremail);
  channel.bind("my-event", function (data) {
    alert(JSON.stringify(data));
  });
  function Welcomedisplay() {
    return (
      <div>
        <div className="WelcomelogoutdeleteDiv">
          <button className="LogoutButton" onClick={handleNotifications} id="">
            Notifications
          </button>
          <button className="LogoutButton" onClick={handlelogout} id="">
            Logout
          </button>
          <Notifications show={show} />
        </div>
        {/* <Notifications show={show} /> */}
        <div>
          <h1 className="WelcomeHeading">
            WELCOME {useSelector((state) => state.userdetails.name)}
          </h1>
        </div>
        <div className="WelcomeButton-Div">
          <button
            className={
              useSelector((state) => state.space.profileClick)
                ? "WelcomeButton WelcomeButtonSelected"
                : "WelcomeButton"
            }
            onClick={handleprofile}
            id=""
          >
            Profile
          </button>
          <button
            className={
              useSelector((state) => state.space.userClick)
                ? "WelcomeButton WelcomeButtonSelected"
                : "WelcomeButton"
            }
            onClick={handleuser}
            id=""
          >
            Users
          </button>
          <button
            className={
              useSelector((state) => state.space.taskClick)
                ? "WelcomeButton WelcomeButtonSelected"
                : "WelcomeButton"
            }
            onClick={handletask}
            id=""
          >
            Tasks
          </button>
          <button
            className="WelcomeButton"
            onClick={handletaskmanagement}
            id=""
          >
            Task Management
          </button>
          {/* <button className='WelcomeButton' onClick={handleupdate} id="">
                    Update Profile
                </button>
                <button className='WelcomeButton' onClick={handlepasswordchange} id="">
                    Change Password
                </button> */}
          {/* {
                    useSelector((state)=>state.userdetails.role).toLowerCase() === "admin" && 
                    <button className='WelcomeButton' onClick={handledeleteuser} id="">
                        Delete User
                    </button>
                }
                {
                    useSelector((state)=>state.userdetails.role).toLowerCase() === "admin" && 
                    <button className='WelcomeButton' onClick={handlecreateuser} id="">
                        Create User
                    </button>
                }
                {
                    useSelector((state)=>state.userdetails.role).toLowerCase() === "normal" && 
                    <button className='WelcomeButton' onClick={handlegetuser} id="">
                        Get Users
                    </button>
                } */}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
  return <div>{temp ? <p>loading...</p> : <Welcomedisplay />}</div>;
}

export default Welcome;
