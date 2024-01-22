import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface helpersStatusState {
    stackHelpersStatus: boolean;
    localizerHelpersStatus: boolean;
}

const initialState: helpersStatusState = {
    stackHelpersStatus: false,
    localizerHelpersStatus: false,
};

export const helpersStatusSlice = createSlice({
    name: 'helpersStatus',
    initialState,
    reducers: {
        setStackHelpersStatus(state, action: PayloadAction<boolean>) {
            state.stackHelpersStatus = action.payload;
        },
        setLocalizerHelpersStatus(state, action: PayloadAction<boolean>) {
            state.localizerHelpersStatus = action.payload;
        },
    },
});

export default helpersStatusSlice.reducer;
