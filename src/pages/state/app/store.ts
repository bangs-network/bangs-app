import {configureStore} from '@reduxjs/toolkit'
import {loadStateReducer} from '../slice/loadStateSlice';
import {roleReducer} from "../slice/roleSlice";
import {dataReducer} from "../slice/dataSlice";
const store = configureStore({
    reducer: {
        loadStateSlice:loadStateReducer,
        roleSlice:roleReducer,
        jsonData: dataReducer
    }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch