import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import "./Welcomestyles.css";
import axios from "axios";
var datalength = 0;
function Alltasks() {
  // const ID = useSelector((state)=>state.userdetails.id);
  const token = localStorage.access_token;
  const navigate = useNavigate();
  const [pagecount, setpagecount] = useState(0);
  const [currentrecords, setcurrentrecords] = useState(null);
  const [recordsperpage, setrecordsperpage] = useState(5);
  const [beginwith, setbeginwith] = useState(0);
  const [temp, settemp] = useState(true);
  const [attribute, setattribute] = useState(null);
  const [order, setorder] = useState(null);
  const [searchword, setsearchword] = useState(null);
  //const [attribute, setattribute] = useState(null);
  //const [order, setorder] = useState(null);
  const [searchattribute, setsearchattribute] = useState("filter");
  const [flag1, setflag1] = useState(false);
  const [flag2, setflag2] = useState(false);
  const [flag3, setflag3] = useState(false);
  const [show, setshow] = useState(false);
  const [filtertext, setfiltertext] = useState("");
  function handlesorting(e) {
    e.preventDefault();
    setbeginwith(0);
    setattribute(e.target.name);
    if (order === "ascending") {
      console.log("in if");
      setorder("descending");
    } else {
      console.log("in else");
      setorder("ascending");
    }
  }
  function Records({ currentrecords }) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlesorting}
                  name="id"
                >
                  Id
                </button>
              </th>
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlesorting}
                  name="title"
                >
                  Title
                </button>
              </th>
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlesorting}
                  name="description"
                >
                  Description
                </button>
              </th>
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlesorting}
                  name="assignee"
                >
                  Assignee
                </button>
              </th>
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlesorting}
                  name="createdby"
                >
                  Created By
                </button>
              </th>
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlesorting}
                  name="duedate"
                >
                  Due Date
                </button>
              </th>
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlesorting}
                  name="status"
                >
                  Status
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentrecords &&
              currentrecords.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.assignee}</td>
                  <td>{data.createdby}</td>
                  <td>
                    {format(new Date(data.duedate), "LLL dd, yyyy hh:mm aa")}
                  </td>
                  <td>{data.status}</td>
                  {/* {ID===data.createdby && <td className="TaskDelete"><button className="Deleteusertabledelete" onClick={handlebutton} id={data.id}>Delete</button></td>} */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  useEffect(() => {
    const noofrecords = parseInt(recordsperpage);
    let config = {
      headers: { Authorization: "Bearer " + token },
      params: {
        startindex: beginwith,
        noofrecords: noofrecords,
        keyword: searchword,
        attribute: attribute,
        order: order,
        searchattribute: searchattribute,
      },
    };
    axios
      .get("http://localhost:8000/task/all-tasks", config)
      .then((response) => {
        setcurrentrecords(response.data.data);
        setpagecount(
          Math.ceil(response.data.length / parseInt(recordsperpage))
        );
        datalength = response.data.length;
        settemp(false);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }, [
    beginwith,
    recordsperpage,
    searchword,
    attribute,
    order,
    searchattribute,
  ]);
  const handlePageClick = (event) => {
    setbeginwith((event.selected * parseInt(recordsperpage)) % datalength);
  };
  function handleonchange(e) {
    setbeginwith(0);
    setrecordsperpage(e.target.value);
  }
  function handlesearch(e) {
    console.log(e.target.value);
    setsearchattribute(null);
    setsearchword(e.target.value);
    setbeginwith(0);
    setflag3(false);
    setflag1(false);
    setflag2(false);
    setfiltertext("filter");
    //setsearchword(e.target.value)
  }
  function handlefiltering(e) {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "filter") {
      setsearchword(null);
      setsearchattribute(null);
      setflag3(false);
      setflag1(false);
      setflag2(false);
    } else if (e.target.value === "status") {
      setflag3(true);
      setflag1(false);
      setflag2(false);
    } else if (e.target.value === "assignee") {
      setflag1(true);
      setflag2(false);
      setflag3(false);
    } else if (e.target.value === "createdby") {
      setflag2(true);
      setflag1(false);
      setflag3(false);
    }
  }
  function handleAddTask(e) {
    e.preventDefault();
    navigate("/welcome/createtask");
  }
  function handleMyTasks(e) {
    e.preventDefault();
    navigate("/welcome/task");
  }
  return (
    <div>
      {temp ? (
        <p>loading...</p>
      ) : (
        <div className="DeleteuserDiv">
          <h3 style={{ color: "#576F72" }}>All Tasks</h3>
          {/* <button className="Deleteusertabledelete" onClick={handleclick}>Filter Options</button> */}
          <input
            className="Createtaskfiveinputs"
            type="text"
            placeholder="search"
            onChange={(e) => {
              handlesearch(e);
            }}
          />
          <select
            className="Createtaskfiveinputs"
            value={filtertext}
            onChange={(e) => {
              handlefiltering(e);
              setfiltertext(e.target.value);
            }}
          >
            <option>filter</option>
            <option>assignee</option>
            <option>createdby</option>
            <option>status</option>
          </select>
          <div className="TaskDivDiv">
            <input
              className={
                flag1 === true
                  ? "TaskDivInput Createtaskfiveinputs"
                  : "TaskDivInputFalse"
              }
              type="text"
              placeholder="Email Id"
              onChange={(e) => {
                setsearchword(e.target.value);
                setsearchattribute("assignee");
                setbeginwith(0);
              }}
            />
            <input
              className={
                flag2 === true
                  ? "TaskDivInput Createtaskfiveinputs"
                  : "TaskDivInputFalse"
              }
              type="text"
              placeholder="Email Id"
              onChange={(e) => {
                setsearchword(e.target.value);
                setsearchattribute("createdby");
                setbeginwith(0);
              }}
            />
            <select
              className={
                flag3 === true
                  ? "TaskDivSelect Createtaskfiveinputs"
                  : "TaskDivSelectFalse"
              }
              onChange={(e) => {
                setsearchword(e.target.value);
                setsearchattribute("status");
                setbeginwith(0);
              }}
            >
              <option>completed</option>
              <option>assigned</option>
              <option>In Progress</option>
              <option>deleted</option>
            </select>
          </div>
          <Records currentrecords={currentrecords} />
          <p className="Deleteuserp">
            Records per page
            <select
              className="Deleteselect"
              value={recordsperpage}
              onChange={(e) => {
                handleonchange(e);
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </p>
          <div className="Deleteuserreactpagination">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              marginPagesDisplayed={3}
              pageCount={pagecount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <button className="TaskButton" onClick={handleAddTask}>
              Add Task
            </button>
            <button className="TaskButton" onClick={handleMyTasks}>
              My Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Alltasks;
