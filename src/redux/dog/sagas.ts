import { call, put, takeLatest } from "typed-redux-saga";
import { fetchDog, requestDogError, requestDogSuccess } from "./reducers";
import { getDogData } from "./APIServices";
import { DogActionTypes } from "./types";

export function* fetchDogSaga() {
    try {
        yield* put(fetchDog());
        const response = yield* call(getDogData);

        yield* put(requestDogSuccess(response));
    } catch (error) {
        yield* put(requestDogError());
    }
}

export function* watchFetchDog() {
    yield* takeLatest(DogActionTypes.FETCH_DOG, fetchDogSaga);
}
