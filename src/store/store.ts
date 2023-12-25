import { configureStore } from '@reduxjs/toolkit';
import currentPatientReducer from './reducers/currentPatient.ts';

const store = configureStore({
    reducer: {
        currentPatient: currentPatientReducer,
    },
    // middleware: (getDefaultMiddleware) => {
    //     return getDefaultMiddleware({
    //         serializableCheck: false
    //     });
    // }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
