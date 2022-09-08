import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { setallusers } from "./userslice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import './Filteroptions.css'
var datalength=0;
function DeleteFilteroptions(){
    const [pagecount, setpagecount] = useState(0);
    const [currentrecords, setcurrentrecords] = useState(null);
    const [recordsperpage, setrecordsperpage] = useState(5);
    const [beginwith, setbeginwith] = useState(0);
    const [temp, settemp] = useState(true);
    const [tempforeffect, settempforeffect] = useState(true);
    const token = localStorage.access_token;
    const dispatch = useDispatch();
    const [filterparams, setfilterparams] = useState({
        name : "",
        email : "",
        role : "",
        created_by : "",
        deleted_by : "",
        deleted : "",
        attribute : "",
        order : ""
    });
    async function handlebutton(e){
        e.preventDefault();
        //console.log(e.target.id);
        await axios.delete('http://localhost:8000/api/deleteuser',{
            data : { id: e.target.id },
            headers: { Authorization: 'Bearer '+ token}
        }).then((response)=>{
            const noofrecords = parseInt(recordsperpage);
            let config = {
                headers: {'Authorization': 'Bearer ' + token},
                params: {
                    startindex : beginwith,
                    noofrecords : noofrecords,
                    name : filterparams.name,
                    email : filterparams.email,
                    role : filterparams.role,
                    created_by : filterparams.created_by,
                    deleted_by : filterparams.deleted_by,
                    deleted : filterparams.deleted,
                    attribute : filterparams.attribute,
                    order : filterparams.order,
                },
            }
            axios.get('http://localhost:8000/api/get-users',config).then((response)=>
            {
                setcurrentrecords(response.data.data);
                datalength = datalength-1;
            }).catch((response)=>{
                console.log(response.data);
            })
           
            });
    }
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
                                    <button className="Deleteusertabledelete" onClick={handlebutton} id={data.id}>Delete</button>
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
                name : filterparams.name,
                email : filterparams.email,
                role : filterparams.role,
                created_by : filterparams.created_by,
                deleted_by : filterparams.deleted_by,
                deleted : filterparams.deleted,
                attribute : filterparams.attribute,
                order : filterparams.order,
            },
        }
        axios.get('http://localhost:8000/api/get-users',config).then((response)=>
        {
            console.log(response.data.length);
            console.log(typeof(response.data.length));
            setcurrentrecords(response.data.data);
            setpagecount(Math.ceil(response.data.length / parseInt(recordsperpage)));
            settemp(false);
            datalength = response.data.length;
        }).catch((response)=>{
            console.log(response.data);
        })
    },[beginwith,recordsperpage,tempforeffect]);
    const handlePageClick = (event) => {
        setbeginwith((event.selected * parseInt(recordsperpage)) % datalength); 
    };
    function handleonchange(e){
        setbeginwith(0);
        setrecordsperpage(e.target.value);
    }
    function handlesubmit(e){
        e.preventDefault();
        //console.log(e.target.Attribute.value);
        setfilterparams({
            name : e.target.Name.value,
            email : e.target.Email.value,
            role : e.target.Role.value,
            created_by : e.target.CreatedBy.value,
            deleted_by : e.target.DeletedBy.value,
            deleted : e.target.Deleted.value,
            attribute : e.target.Attribute.value,
            order : e.target.Order.value
        });
        if(tempforeffect==true){
            settempforeffect(false);
        }
        else{
            settempforeffect(true);
        }
        setbeginwith(0);
        setrecordsperpage(5);
    }
    return(
        <div className="FilteroptionsDiv">
            <form className="Filteroptionsform" onSubmit={handlesubmit}>
                <p>Name : <input className="Filteroptionsinput" type={"text"} placeholder="name" name="Name"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Email : <input className="Filteroptionsinput" type={"text"} placeholder="email" name="Email"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Role : <input className="Filteroptionsinput" type={"text"} placeholder="role" name="Role"></input></p>
                <p>Created By : <input className="Filteroptionsinput" type={"text"} placeholder="created by" name="CreatedBy"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Deleted By : <input className="Filteroptionsinput" type={"text"} placeholder="deleted by" name="DeletedBy"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Deleted : <input className="Filteroptionsinput" type={"text"} placeholder="deleted" name="Deleted"></input></p>
                <p>For arranging the records in increasing order or decreasing order based on the selected attribute </p>
                <p>Attribute : <input className="Filteroptionsinput" type={"text"} placeholder="attribute" name="Attribute"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Order : <input className="Filteroptionsinput" type="text" placeholder="order" name="Order" /></p>
                <input className="Filteroptionsinput" type="submit" />
            </form>
            {temp ? <p>loading...</p> :
            <div className="DeleteuserDiv">
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
};
export default DeleteFilteroptions;