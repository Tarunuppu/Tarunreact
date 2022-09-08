import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setallusers } from "./userslice";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import ReactPaginate from 'react-paginate';
//import { setmessage } from "./messageslice";
import { useNavigate } from "react-router-dom";
import './Welcomestyles.css';

let dispatch;
let navigate;
var datalength =0;

function Getuser(){
    dispatch = useDispatch();
    navigate = useNavigate();
    let token = localStorage.access_token;
    const [pagecount, setpagecount] = useState(0);
    const [currentrecords, setcurrentrecords] = useState(null);
    const [recordsperpage, setrecordsperpage] = useState(5);
    const [beginwith, setbeginwith] = useState(0);
    const [temp, settemp] = useState(true);
    function Records({currentrecords}){
        return(
            <div >
                <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>EmailId</th>
                        <th>Role</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                
                        {   currentrecords &&
                            currentrecords.map((data)=>
                                
                                <tr key={data.email}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.role}</td>
                                    <td>{data.created_by}</td>
                                </tr>
                            )
                        }
            
                </tbody>
            
                </table>
            </div>
        )
    }
    
    useEffect(()=>{
        const noofrecords = parseInt(recordsperpage);
        let config = {
            headers: {'Authorization': 'Bearer ' + token},
            params: {
                startindex : beginwith,
                noofrecords : noofrecords,
            },
        }
        axios.get('http://localhost:8000/api/getpartofusers',config).then((response)=>
        {
            setcurrentrecords(response.data);
            axios.get('http://localhost:8000/api/sizeofdatabase',{
                headers: {'Authorization': 'Bearer ' + token},
            }).then((response)=>{
                setpagecount(Math.ceil(response.data / parseInt(recordsperpage)));
                datalength = response.data;
                settemp(false);
            });
        }).catch((response)=>{
            console.log(response.data);
        })
    },[beginwith,recordsperpage]);
    const handlePageClick = (event) => {
        setbeginwith((event.selected * parseInt(recordsperpage)) % datalength); 
    };
    function handleonchange(e){
        setbeginwith(0);
        setrecordsperpage(e.target.value);
    }
    function handleclick(e){
        e.preventDefault();
        navigate('/welcome/userfilteroptions');
    }
    return(
        <div>
            {temp ? <p>loading...</p> :
            <div className="DeleteuserDiv">
                <button className="Deleteusertabledelete" onClick={handleclick}>Filter Options</button>
                <Records currentrecords = {currentrecords}/>
                <p className="Deleteuserp">Records per page<select className="Deleteselect" value={recordsperpage} onChange={(e)=>{handleonchange(e)}}>
                    <option >5</option>
                    <option >10</option>
                    <option >15</option>
                </select></p>
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
            </div>}
        </div>
    )
}
export default Getuser;