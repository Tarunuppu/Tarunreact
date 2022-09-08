import { createSlice } from '@reduxjs/toolkit'

const spaceslice = createSlice({
  name: 'space',
  initialState: {
    value: 0,
    profileClick: false,
    userClick: false,
    taskClick : false,
    taskMClick : false
  },
  reducers: {
    setvalue(state,action) {
      state.value=action.payload
    },
    setprofileClick(state,action){
      state.profileClick = action.payload
    },
    setuserClick(state, action){
      state.userClick = action.payload
    },
    settaskClick(state, action){
      state.taskClick = action.payload
    },
    settaskMClick(state, action){
      state.taskMClick = action.payload
    }
  },
})
//console.log(typeof(tokenslice));
export const { setvalue, setprofileClick, settaskClick,settaskMClick, setuserClick} = spaceslice.actions
export default spaceslice.reducer