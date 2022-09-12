import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import Updatetask from "./Updatetask";
import Updatemultipletask from "./Updatemultipletask";
import "./Welcomestyles.css";
import axios from "axios";
import { format } from "date-fns";
import { settaskClick } from "./spaceslice";

var datalength = 0;
function Task() {
  // const [toggle, settoggle] = useState({
  //     id : "asc",
  //     title : "asc",
  //     description : "asc",
  //     assignee : "asc",
  //     createdby : "asc",
  //     duedate : "asc",
  //     status : "asc",
  // });
  const dispatch = useDispatch();
  const ID = useSelector((state) => state.userdetails.email);
  const ROLE = useSelector((state) => state.userdetails.role);
  const token = localStorage.access_token;
  const navigate = useNavigate();
  const [pagecount, setpagecount] = useState(0);
  const [currentrecords, setcurrentrecords] = useState(null);
  const [recordsperpage, setrecordsperpage] = useState(5);
  const [beginwith, setbeginwith] = useState(0);
  const [temp, settemp] = useState(true);
  const [searchword, setsearchword] = useState(null);
  const [attribute, setattribute] = useState(null);
  const [order, setorder] = useState(null);
  const [searchattribute, setsearchattribute] = useState("filter");
  const [flag1, setflag1] = useState(false);
  const [flag2, setflag2] = useState(false);
  const [flag3, setflag3] = useState(false);
  const [show, setshow] = useState(false);
  const [showmul, setshowmul] = useState(false);
  const [updateId, setupdateId] = useState(0);
  const [filtertext, setfiltertext] = useState("");
  const [mulupdate, setmulupdate] = useState(false);
  const [muldelete, setmuldelete] = useState(false);
  const [countupdate, setcountupdate] = useState(0);
  const [countdelete, setcountdelete] = useState(0);
  const [deletecollect, setdeletecollect] = useState(null);
  const [updatecollect, setupdatecollect] = useState(null);
  const [updatecollectcopy, setupdatecollectcopy] = useState(null);
  const [isDeleteChecked, setisDeleteChecked] = useState();
  const [isUpdateChecked, setisUpdateChecked] = useState();
  async function handleplus(e) {
    e.preventDefault();
    navigate("/welcome/createtask");
  }
  function handlealltasks(e) {
    e.preventDefault();
    navigate("/welcome/alltasks");
  }
  async function handlebutton(e) {
    e.preventDefault();
    await axios
      .delete("http://localhost:8000/task/delete-tasks", {
        data: { id: e.target.id },
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        const noofrecords = parseInt(recordsperpage);
        let config = {
          headers: { Authorization: "Bearer " + token },
          params: {
            startindex: beginwith,
            noofrecords: noofrecords,
          },
        };
        axios
          .get("http://localhost:8000/task/get-tasks", config)
          .then((response) => {
            setcurrentrecords(response.data.data);
            datalength = datalength - 1;
          })
          .catch((response) => {
            console.log(response.data);
          });
      });
  }
  function handlesorting(e) {
    e.preventDefault();
    setbeginwith(0);
    setattribute(e.target.name);
    if (order === "ascending") {
      setorder("descending");
    } else {
      setorder("ascending");
    }
  }

  function handleUpdate(e) {
    e.preventDefault();
    setshow(true);
    setupdateId(e.target.id);
  }
  function handlemultiple(e) {
    if (e.target.name === "multipleupdate") {
      if (mulupdate === true) {
        setmulupdate(false);
        setcountupdate(0);
      } else {
        setmulupdate(true);
        setupdatecollect([]);
        setisUpdateChecked(new Array(parseInt(recordsperpage)).fill(false));
      }
    } else {
      if (muldelete === true) {
        setmuldelete(false);
        setcountdelete(0);
      } else {
        setmuldelete(true);
        setdeletecollect([]);
        setisDeleteChecked(new Array(parseInt(recordsperpage)).fill(false));
      }
    }
  }

  function handlemulupdate(position, id) {
    let tempcollection1 = updatecollect;

    const updatedCheckedState1 = isUpdateChecked.map((item, index) => {
      if (index === position) {
        if (item === true) {
          setcountupdate(countupdate - 1);
          tempcollection1 = tempcollection1.filter((e) => e !== id);
          setupdatecollect(tempcollection1);
        } else {
          setcountupdate(countupdate + 1);
          tempcollection1.push(id);
          setupdatecollect(tempcollection1);
        }
        return !item;
      } else {
        return item;
      }
    });

    setisUpdateChecked(updatedCheckedState1);
    console.log(isUpdateChecked);
    console.log(updatecollect);
    // console.log(id);
  }
  function handlemuldelete(position, id) {
    let tempcollection = deletecollect;

    const updatedCheckedState = isDeleteChecked.map((item, index) => {
      if (index === position) {
        if (item === true) {
          setcountdelete(countdelete - 1);
          tempcollection = tempcollection.filter((e) => e !== id);
          setdeletecollect(tempcollection);
        } else {
          setcountdelete(countdelete + 1);
          tempcollection.push(id);
          setdeletecollect(tempcollection);
        }
        return !item;
      } else {
        return item;
      }
    });

    setisDeleteChecked(updatedCheckedState);
    // console.log(isDeleteChecked);
    console.log(deletecollect);
    // console.log(id);
    // if (isDeleteChecked[index] === true) {
    //   setcountdelete(countdelete - 1);
    // } else {
    //   setcountdelete(countdelete + 1);
    // }
    // setisDeleteChecked(!isDeleteChecked);
  }
  function handleupdateall(e) {
    e.preventDefault();
    setshowmul(true);
    setupdatecollectcopy(updatecollect);
  }
  function handledeleteall(e) {
    e.preventDefault();
    console.log(deletecollect);
    let findlength = deletecollect;
    axios
      .delete("http://localhost:8000/task/delete-multiple-tasks", {
        data: { collection: deletecollect },
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response.data);
        const noofrecords = parseInt(recordsperpage);
        let config = {
          headers: { Authorization: "Bearer " + token },
          params: {
            startindex: beginwith,
            noofrecords: noofrecords,
          },
        };
        axios
          .get("http://localhost:8000/task/get-tasks", config)
          .then((response) => {
            setcurrentrecords(response.data.data);
            setisDeleteChecked(new Array(parseInt(recordsperpage)).fill(false));
            setmuldelete(false);
            setcountdelete(0);
            datalength = datalength - findlength.length;
          })
          .catch((response) => {
            console.log(response.data);
          });
      });
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
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlemultiple}
                  name="multipleupdate"
                >
                  Mul. Update
                </button>
                {countupdate > 0 && (
                  <button
                    className="Deleteusertabledelete"
                    onClick={handleupdateall}
                  >
                    Update Sel.
                  </button>
                )}
              </th>
              <th className="TaskDelete">
                <button
                  className="Deleteusertabledelete"
                  onClick={handlemultiple}
                  name="multipledelete"
                >
                  Mul. Delete
                </button>
                {countdelete > 0 && (
                  <button
                    className="Deleteusertabledelete"
                    onClick={handledeleteall}
                  >
                    Delete Sel.
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentrecords &&
              currentrecords.map((data, index) => (
                <tr key={data.id}>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.assignee}</td>
                  <td>{data.createdby}</td>
                  <td>
                    {format(new Date(data.duedate), "LLL dd, yyyy hh:mm aa")}
                  </td>
                  <td>{data.status}</td>
                  <td className="TaskDelete">
                    <button
                      className="Deleteusertabledelete"
                      onClick={(e) => {
                        handleUpdate(e);
                      }}
                      id={data.id}
                    >
                      Update
                    </button>
                    {mulupdate && (
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          e.preventDefault();
                          handlemulupdate(index, data.id);
                        }}
                        id="checkupdate"
                        checked={isUpdateChecked[index]}
                      />
                    )}
                  </td>
                  {ID === data.createdby && (
                    <td className="TaskDelete">
                      <button
                        className="Deleteusertabledelete"
                        onClick={handlebutton}
                        id={data.id}
                      >
                        Delete
                      </button>
                      {muldelete && (
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            e.preventDefault();
                            handlemuldelete(index, data.id);
                          }}
                          id="checkdelete"
                          checked={isDeleteChecked[index]}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  useEffect(() => {
    dispatch(settaskClick(true));
    const unsettaskClick = () => {
      dispatch(settaskClick(false));
    };
    const timer = setTimeout(() => {
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
        .get("http://localhost:8000/task/get-tasks", config)
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
    }, 1000);
    return () => {
      clearTimeout(timer);
      unsettaskClick();
    };
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
    setmuldelete(false);
    setcountdelete(0);
  };
  function handleonchange(e) {
    setbeginwith(0);
    setrecordsperpage(e.target.value);
    setmuldelete(false);
    setcountdelete(0);
  }
  function handlesearch(e) {
    setsearchattribute(null);
    setsearchword(e.target.value);
    setbeginwith(0);
    //setsearchword(e.target.value)
  }
  // function handleclick(e){
  //     e.preventDefault();
  //     navigate('/welcome/deletefilteroptions');
  // }
  function handlefiltering(e) {
    e.preventDefault();

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
  return (
    <div>
      {temp ? (
        <p>loading...</p>
      ) : (
        <div className="DeleteuserDiv">
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

          {/* <button className="Deleteusertabledelete" onClick={handleclick}>Filter Options</button> */}
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
          <div>
            {/* <button className="TaskButton" onClick={(e)=>{console.log('clicked');handleUpdate(e);}}>Update Task</button> */}
            <Updatetask
              onClose={() => {
                setshow(false);
              }}
              show={show}
              updateId={updateId}
            />
            <Updatemultipletask
              onClose={() => {
                setshowmul(false);
              }}
              show={showmul}
              collection={updatecollectcopy}
              email={ID}
            />
            <button className="TaskButton" onClick={handleplus}>
              Add Task
            </button>
            {ROLE === "Admin" && (
              <button className="TaskButton" onClick={handlealltasks}>
                All Tasks
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Task;
