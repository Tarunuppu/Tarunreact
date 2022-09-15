import React from "react";
//import ReactDOM from 'react-dom/client';
//import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forgetpassword from "./Forgetpassword";
import Login from "./Login";
import Signup from "./Signup";
import Welcome from "./Welcome";
import Error from "./Error";
import Notverified from "./Notverified";
import Startbutton from "./Startbutton";
import Verifyemail from "./Verifyemail";
import Verifyemailforgotpassword from "./Verifyemailforgotpassword";
import Profile from "./Profile";
import Updateprofile from "./Updateprofile";
import Updatepassword from "./Updatepassword";
import Logout from "./Logout";
import Delete from "./Delete";
import Deleteuser from "./Deleteuser";
import Createuser from "./Createuser";
import Getuser from "./Getuser";
import DeleteFilteroptions from "./DeleteFilteroptions";
import User from "./User";
import Task from "./Task";
import Createtask from "./Createtask";
import Alltasks from "./Alltasks";
import Timelineadmin from "./Timelineadmin";
import { Navigate } from "react-router-dom";
import Filteredtasks from "./Filteredtasks";
import Taskmanagement from "./Taskmanagement";

import UserFilteroptions from "./UserFilteroptions";
//import { Navigate } from 'react-router-dom';
function App() {
  //const username=useSelector((state)=>state.name.value);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Startbutton />}>
          <Route path="login" element={<Login />} />
          <Route path="forgetpassword" element={<Forgetpassword />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/welcome" element={<Welcome />}>
          <Route path="profile" element={<Profile />} />
          <Route path="updateprofile" element={<Updateprofile />} />
          <Route path="updatepassword" element={<Updatepassword />} />
          <Route path="logout" element={<Logout />} />
          <Route path="delete" element={<Delete />} />
          <Route path="deleteuser" element={<Deleteuser />}></Route>
          <Route path="deletefilteroptions" element={<DeleteFilteroptions />} />

          <Route path="taskmanagement" element={<Taskmanagement />}></Route>
          <Route path="timeline" element={<Timelineadmin />}></Route>
          <Route path="filteredtasks" element={<Filteredtasks />}></Route>
          <Route path="createuser" element={<Createuser />} />
          <Route path="getuser" element={<Getuser />}></Route>
          <Route path="userfilteroptions" element={<UserFilteroptions />} />
          <Route path="user" element={<User />} />
          <Route path="task" element={<Task />} />
          <Route path="createtask" element={<Createtask />} />
          <Route path="alltasks" element={<Alltasks />}></Route>
          {/* <Route path="updateprofile" element={}/>
                    <Route path="passwordchange" element={}/>
                    <Route path="logout" element={}/>
                    <Route path="delete" element={}/> */}
        </Route>
        <Route path="/notverified" element={<Notverified />} />
        {/* <Route path="/Welcome" element={<Welcome name={username}/>}/> */}
        <Route path="/responsemessage" element={<Error />} />
        <Route path="/verifyemail/:tokenvalue" element={<Verifyemail />} />
        <Route
          path="/verifyemail_forgotpassword/:tokenvalue"
          element={<Verifyemailforgotpassword />}
        />

        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
