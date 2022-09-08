import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import "./Welcomestyles.css";
function Notifications(props) {
  const [notification, setnotification] = useState(null);
  const token = localStorage.access_token;
  const [show, setshow] = useState(false);
  const [temp, settemp] = useState(0);
  useEffect(() => {
    let config = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .get("http://localhost:8000/task/getnotification", config)
      .then((response) => {
        setnotification(response.data);
        setshow(props.show);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [props, temp]);
  function handledeletenotification(e) {
    e.preventDefault();
    axios
      .delete("http://localhost:8000/task/deletenotification", {
        data: { id: e.target.id },
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response);
        settemp(temp + 1);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  function handleclearnotification(e) {
    e.preventDefault();
    axios
      .delete("http://localhost:8000/task/clearnotification", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response);
        settemp(temp + 1);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  return (
    <div className={show ? "Notifications show" : "Notifications"}>
      <div className="Notification-box">
        {notification && notification.length === 0 && <p>No Notifications</p>}
        {notification &&
          notification.map((data) => (
            <div className="Notification-item" key={data.id}>
              <p>{data.message}</p>
              <button
                className="Notification-button"
                onClick={handledeletenotification}
                id={data.id}
              >
                clear
              </button>
            </div>
          ))}
        <div className="Notification-clearDIV">
          <button
            className="Notification-clearbutton"
            onClick={handleclearnotification}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
export default Notifications;
