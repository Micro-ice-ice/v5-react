import { configureStore } from '@reduxjs/toolkit';
import currentPatientReducer from './reducers/currentPatient.ts';
import helpersStatusReducer from './reducers/helpersStatus.ts';

const store = configureStore({
    reducer: {
        currentPatient: currentPatientReducer,
        helpersStatus: helpersStatusReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
