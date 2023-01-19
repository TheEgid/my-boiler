import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { getPersistConfig } from "redux-deep-persist";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";

const persistConfig = getPersistConfig({
    key: "root",
    storage,
    blacklist: ["DogSlice", "userSlice.error"],
    rootReducer,
});

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
