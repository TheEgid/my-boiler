import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { DogActionTypes, IDogData, IDogState } from "./types";

export const fetchDogStart = createAction(DogActionTypes.FETCH_DOG_START);

const initialState: IDogState = {
    url: "",
    loading: false,
    error: false,
};

export const dogSlice = createSlice({
    name: "dog",
    initialState,
    reducers: {
        dogLoading(state) {
            state.loading = true;
            state.error = false;
        },
        dogFetch(state, action: PayloadAction<IDogData>) {
            state.loading = false;
            state.error = false;
            state.url = action.payload.message;
        },
        dogError(state) {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { dogLoading, dogFetch, dogError } = dogSlice.actions;

export const dogSliceReducer = dogSlice.reducer;
