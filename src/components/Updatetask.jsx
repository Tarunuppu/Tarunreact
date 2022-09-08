import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import "./Welcomestyles.css";
function Updatetask(props) {
  const token = localStorage.access_token;
  const userEmail = useSelector((state) => state.userdetails.email);
  const [temp, settemp] = useState(true);
  const [uptitle, setuptitle] = useState("");
  const [updescription, setupdescription] = useState("");
  const [upstatus, setupstatus] = useState("");
  const [upduedate, setupduedate] = useState("");
  const [upassignee, setupassignee] = useState("");
  const [recordassignee, setrecordassignee] = useState("");
  const [recordcreatedby, setrecordcreatedby] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      let config = {
        headers: { Authorization: "Bearer " + token },
        params: {
          id: parseInt(props.updateId),
        },
      };
      axios
        .get("http://localhost:8000/task/onetask", config)
        .then((response) => {
          if (response.data.length === 0) {
            setrecordassignee("");
            setrecordcreatedby("");
            setuptitle("");
            setupdescription("");
            setupassignee("");
            setupstatus("");
          } else {
            setrecordassignee(response.data[0].assignee);
            setrecordcreatedby(response.data[0].createdby);
            setuptitle(response.data[0].title);
            setupdescription(response.data[0].description);
            setupassignee(response.data[0].assignee);
            setupstatus(response.data[0].status);
          }
          settemp(false);
        })
        .catch((response) => {
          console.log(response);
        });
    }, 700);
    return () => clearTimeout(timer);
  }, [props]);

  function handlesubmit(e) {
    e.preventDefault();
    if (upduedate === "") {
      axios
        .put(
          "http://localhost:8000/task/update-tasks",
          {
            id: parseInt(props.updateId),
            title: uptitle,
            description: updescription,
            assignee: upassignee,
            status: upstatus,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          alert("Task Updated");
        })
        .catch((response) => {
          alert("Error");
          console.log(response);
        });
    } else {
      axios
        .put(
          "http://localhost:8000/task/update-tasks",
          {
            id: parseInt(props.updateId),
            title: uptitle,
            description: updescription,
            assignee: upassignee,
            status: upstatus,
            duedate: upduedate,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          alert("Task Updated");
        })
        .catch((response) => {
          alert("Error");
          console.log(response);
        });
    }
  }
  function handleonclick(e) {
    e.preventDefault();
    settemp(true);
    props.onClose();
  }
  return (
    <div
      className={props.show ? "modal show" : "modal"}
      onClick={handleonclick}
    >
      {temp ? (
        <p>loading...</p>
      ) : (
        <div>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4 className="modal-title">Update Task</h4>
            </div>
            <div className="modal-body">
              {userEmail === recordcreatedby && (
                <p>
                  Title :{" "}
                  <input
                    className="Createtaskfiveinputs"
                    type="text"
                    placeholder="title"
                    value={uptitle}
                    onChange={(e) => setuptitle(e.target.value)}
                  />
                </p>
              )}
              {userEmail === recordcreatedby && (
                <p>
                  Description :{" "}
                  <textarea
                    className="Createtaskfiveinputs"
                    type="text"
                    placeholder="description"
                    value={updescription}
                    onChange={(e) => setupdescription(e.target.value)}
                    rows="10"
                    cols="50"
                  ></textarea>
                </p>
              )}
              {userEmail === recordcreatedby && (
                <p>
                  Assignee :{" "}
                  <input
                    className="Createtaskfiveinputs"
                    type="text"
                    placeholder="Assignee"
                    value={upassignee}
                    onChange={(e) => setupassignee(e.target.value)}
                  />
                </p>
              )}
              {userEmail === recordcreatedby && (
                <div className="CreatetaskDatePicker">
                  Due Date :
                  <DatePicker
                    className="Createtaskfiveinputs"
                    selected={upduedate}
                    onChange={(date) => setupduedate(date)}
                    showTimeSelect
                  />
                </div>
              )}
              {userEmail === recordassignee && (
                <div>
                  <p style={{ marginBottom: 0 + "px" }}>Status :</p>
                  <input
                    className="Createtaskfiveinputs"
                    type="text"
                    placeholder="status"
                    value={upstatus}
                    onChange={(e) => setupstatus(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="TaskButton" onClick={handlesubmit}>
                Submit
              </button>
              <button className="TaskButton" onClick={props.onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Updatetask;
