import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDogData, IDogState } from "./types";

const initialState: IDogState = {
    url: "",
    loading: false,
    error: false,
};

export const dogSlice = createSlice({
    name: "dogSlice",
    initialState,
    reducers: {
        fetchDog(state) {
            state.loading = true;
            state.error = false;
        },
        requestDogSuccess(state, action: PayloadAction<IDogData>) {
            state.loading = false;
            state.error = false;
            state.url = action.payload.message;
        },
        requestDogError(state) {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { fetchDog, requestDogSuccess, requestDogError } = dogSlice.actions;

export const dogSliceReducer = dogSlice.reducer;
