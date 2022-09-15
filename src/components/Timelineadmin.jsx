import React from "react";
import "./Welcomestyles.css";
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

function Timelineadmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [temp, settemp] = useState(true);
  const token = localStorage.access_token;
  const userrole = useSelector((state) => state.userdetails.role);

  return (
    <div>
      {userrole.toLowerCase() === "normal" && (
        <div className="TaskmanagementTimeLine-Normal TaskmanagementTimeline">
          <h3>My Tasks Time Line</h3>
          <Timeparttask url={"http://localhost:8000/task/get-tasks"} />
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
  );
}
export default Timelineadmin;
