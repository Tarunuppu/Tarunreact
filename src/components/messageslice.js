import { createSlice } from '@reduxjs/toolkit'

const messageslice = createSlice({
  name: 'message',
  initialState: {
    value: "",
  },
  reducers: {
    setmessage(state,action) {
      state.value=action.payload
    },
  },
})
//console.log(typeof(tokenslice));
export const { setmessage} = messageslice.actions
export default messageslice.reducer