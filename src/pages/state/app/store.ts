import {configureStore} from '@reduxjs/toolkit'
import {loadStateReducer} from '../slice/loadStateSlice';
const store = configureStore({
    reducer: {
        loadStateSlice:loadStateReducer
    }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch