import { configureStore } from '@reduxjs/toolkit';
import currentPatientDataReducer from './reducers/currentPatientData.ts';
import helpersStatusReducer from './reducers/helpersStatus.ts';

const store = configureStore({
    reducer: {
        currentPatientData: currentPatientDataReducer,
        helpersStatus: helpersStatusReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
