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
import "./Welcomestyles.css";

function Taskmanagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [temp, settemp] = useState(true);
  const token = localStorage.access_token;

  const userrole = useSelector((state) => state.userdetails.role);
  const handletimelineadmin = (e) => {
    e.preventDefault();
    navigate("/welcome/timeline");
  };
  //   useEffect(() => {
  //     axios
  //       .post("http://localhost:8000/api/user-profile", null, {
  //         headers: { Authorization: "Bearer " + token },
  //       })
  //       .then((response) => {
  //         dispatch(setname(response.data.name));
  //         dispatch(setrole(response.data.role));
  //         dispatch(setemail(response.data.email));
  //         dispatch(setid(response.data.id));
  //         settemp(false);
  //       });
  //   }, []);
  return (
    <div>
      {/* {temp ? (
        <p>loading...</p>
      ) : ( */}
      <div className="Taskmanagementanalysis-Div">
        <div className="Taskmanagementanalysis1">
          <ToMePie />
          <ByMePie />
        </div>
      </div>
      {userrole.toLowerCase() === "admin" && (
        <div className="Taskmanagementanalysis2">
          <Allpie />
        </div>
      )}
      {/* {userrole.toLowerCase() === "normal" && (
          <div className="TaskmanagementTimeline">
            <Timeparttask url={"http://localhost:8000/task/get-tasks"} />
          </div>
        )} */}
      {/* <div className="ButtonTimeLine-Div">
        <button className="ButtonTimeLine" onClick={handletimelineadmin}>
          Time Line
        </button>
      </div> */}
      <div>
        {userrole.toLowerCase() === "normal" && (
          <div className="TaskmanagementTimeLine-Normal">
            <div>
              <h3 className="TaskmanagementTimeLineHeading">
                My Tasks Time Line
              </h3>
            </div>
            <div>
              <Timeparttask url={"http://localhost:8000/task/get-tasks"} />
            </div>
          </div>
        )}
        {userrole.toLowerCase() === "admin" && (
          <div className="TaskmanagementTimeLine-Admin">
            <div className="TaskmanagementTimeline">
              <h3 className="TaskmanagementTimeLineHeading">
                All Tasks Time Line
              </h3>
              <Timeparttask url="http://localhost:8000/task/all-tasks" />
            </div>
            <div className="TaskmanagementTimeline">
              <h3 className="TaskmanagementTimeLineHeading">
                My Tasks Time Line
              </h3>
              <Timeparttask url="http://localhost:8000/task/get-tasks" />
            </div>
          </div>
        )}
      </div>

      {/* )} */}
    </div>
  );
}
export default Taskmanagement;

// {userrole.toLowerCase() === 'admin' &&
// <button className='Taskmanagementsidebarbutton' onClick={handletimelineadmin} id="">
//     Time Line
// </button>
// }
