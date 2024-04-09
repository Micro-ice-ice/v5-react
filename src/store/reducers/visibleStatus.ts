import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface visibleStatus {
    aortaVisible: boolean;
    dicomVisible: boolean;
}

const initialState: visibleStatus = {
    aortaVisible: false,
    dicomVisible: false,
};

export const visibleStatusSlice = createSlice({
    name: 'visibilityStatus',
    initialState,
    reducers: {
        setAortaVisible(state, action: PayloadAction<boolean>) {
            state.aortaVisible = action.payload;
        },
        setDicomVisible(state, action: PayloadAction<boolean>) {
            state.dicomVisible = action.payload;
        },
    },
});

export default visibleStatusSlice.reducer;
