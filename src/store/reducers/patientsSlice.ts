import {SeriesModel} from "ami.js";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PatientsState {

    patients: SeriesModel[],
    currentPatient: SeriesModel | null
}

const initialState: PatientsState = {

    patients: [],
    currentPatient: null
}

export const patientSlice = createSlice({

    name:'patients',
    initialState,
    reducers: {

        addPatient(state, action: PayloadAction<SeriesModel>) {

            state.patients.push(action.payload);
        },

    },

})

export default patientSlice.reducer;