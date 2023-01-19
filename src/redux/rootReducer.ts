import { combineReducers } from "redux";
import { dogSliceReducer } from "./dog/reducers";
import { interactSliceReducer, userSliceReducer } from "./auth/reducers";
import { albumSliceReducer } from "./album/reducers";
import { imageSliceReducer } from "./image/reducers";

export const rootReducer = combineReducers({
    userSliceReducer,
    interactSliceReducer,
    dogSliceReducer,
    albumSliceReducer,
    imageSliceReducer,
});
