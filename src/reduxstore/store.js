import {configureStore} from '@reduxjs/toolkit';
import Reducer from '../components/spaceslice';
import userreducer from '../components/userslice';
import messagereducer from '../components/messageslice';
export default configureStore({
  reducer: {
    space: Reducer,
    message: messagereducer,
    userdetails: userreducer
  },
});