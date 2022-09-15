import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Welcomestyles.css";

function Filteredtasks() {
  const token = localStorage.access_token;
  const location = useLocation();
  const url = location.state.url;
  console.log(url);
  const navigate = useNavigate();
  const Assignee = useSelector((state) => state.userdetails.assignee);
  const Createdby = useSelector((state) => state.userdetails.createdby);
  const Status = useSelector((state) => state.userdetails.status);
  const [currentrecords, setcurrentrecords] = useState(null);
  function Records({ currentrecords }) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th className="TaskDelete">
                <button className="Deleteusertabledelete" name="title">
                  Title
                </button>
              </th>
              <th className="TaskDelete">
                <button className="Deleteusertabledelete" name="description">
                  Description
                </button>
              </th>
              <th className="TaskDelete">
                <button className="Deleteusertabledelete" name="assignee">
                  Assignee
                </button>
              </th>
              <th className="TaskDelete">
                <button className="Deleteusertabledelete" name="createdby">
                  Created By
                </button>
              </th>
              <th className="TaskDelete">
                <button className="Deleteusertabledelete" name="duedate">
                  Due Date
                </button>
              </th>
              <th className="TaskDelete">
                <button className="Deleteusertabledelete" name="status">
                  Status
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentrecords &&
              currentrecords.map((data) => (
                <tr key={data.id}>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.assignee}</td>
                  <td>{data.createdby}</td>
                  <td>
                    {format(new Date(data.duedate), "LLL dd, yyyy hh:mm aa")}
                  </td>
                  <td>{data.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  useEffect(() => {
    console.log(Assignee);
    console.log(Createdby);
    console.log(Status);
    let config = {
      headers: { Authorization: "Bearer " + token },
      params: {
        // startindex : beginwith,
        // noofrecords : noofrecords,
        assignee: Assignee,
        createdby: Createdby,
        status: Status,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        setcurrentrecords(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);
  return (
    <div>
      <div className="Taskmanagementanalysis">
        <Records currentrecords={currentrecords} />
      </div>
    </div>
  );
}
export default Filteredtasks;
