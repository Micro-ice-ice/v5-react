import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Patient from '../../models/Patient.ts';

interface currentPatientState {
    patient?: Patient;
}

const initialState: currentPatientState = {
    patient: undefined,
};

export const currentPatientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        selectPatient(state, action: PayloadAction<Patient>) {
            state.patient = action.payload;
        },
    },
});

export default currentPatientSlice.reducer;
