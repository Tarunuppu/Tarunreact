import { createSlice } from '@reduxjs/toolkit'
const userslice = createSlice({
    name: 'userdetails',
    initialState: {
      //value: '',
      name:'',
      email:'',
      role:'',
      id: null,
      allusers: null,
      assignee: '',
      createdby: '',
      status : ''
    },
    reducers: {
      setname(state,action) {
        state.name=action.payload
      },
      setemail(state,action){
        state.email=action.payload
      },
      setrole(state,action){
        state.role=action.payload
      },
      setallusers(state, action){
        state.allusers = action.payload
      },
      setid(state,action){
        state.id = action.payload
      },
      setassignee(state,action){
        state.assignee = action.payload
      },
      setcreatedby(state,action){
        state.createdby = action.payload
      },
      setstatus(state,action){
        state.status = action.payload
      }
    },
  })
  //console.log(typeof(tokenslice));
  export const {setname, setemail, setrole, setallusers, setid, setassignee, setcreatedby, setstatus} = userslice.actions
  export default userslice.reducer