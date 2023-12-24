import { SeriesModel } from 'ami.js';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface currentPatientState {
    patients: SeriesModel[];
    currentPatient: SeriesModel | null;
}

const initialState: currentPatientState = {
    patients: [],
    currentPatient: null,
};

export const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        addPatient(state, action: PayloadAction<SeriesModel>) {
            state.patients.push(action.payload);
        },
    },
});

export default patientSlice.reducer;
