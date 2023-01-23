import { call, put, takeLatest } from "typed-redux-saga";
import { dogLoading, dogFetch, dogError } from "./slices";
import { getDogDataFromApi } from "./ApiServices";
import { DogActionTypes } from "./types";

function* fetchDogSaga() {
    try {
        yield* put(dogLoading());

        const response = yield* call(getDogDataFromApi);

        yield* put(dogFetch(response));
    } catch (error) {
        yield* put(dogError());
    }
}

export function* watchFetchDog() {
    yield* takeLatest(DogActionTypes.FETCH_DOG_START, fetchDogSaga);
}
