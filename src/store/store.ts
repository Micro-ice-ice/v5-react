import {configureStore} from "@reduxjs/toolkit";
import patientsReducer from './reducers/currentPatient.ts'


const store =  configureStore({

    reducer: {

        patients: patientsReducer
    },
    // middleware: (getDefaultMiddleware) => {
    //     return getDefaultMiddleware({
    //         serializableCheck: false
    //     });
    // }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;