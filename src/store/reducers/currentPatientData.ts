import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PatientData from '../../models/PatientData.ts';

interface currentPatientDataState {
    patientData?: Omit<PatientData, 'aortaFile' | 'dicomFiles'>;
}

const initialState: currentPatientDataState = {
    patientData: undefined,
};

export const currentPatientDataSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        selectPatientData(
            state,
            action: PayloadAction<Omit<PatientData, 'aortaFile' | 'dicomFiles'>>
        ) {
            state.patientData = action.payload;
        },
    },
});

export default currentPatientDataSlice.reducer;
