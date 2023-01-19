import { all, takeLatest } from "typed-redux-saga";
import { watchFetchDog } from "./dog/sagas";
import { UserActionTypes } from "./auth/types";
import { ImageActionTypes } from "./image/types";
import { AlbumActionTypes } from "./album/types";
import { changePasswordSaga, confirmChangePasswordSaga, confirmEmailSaga, loginSaga, registerSaga } from "./auth/sagas";
import { addAlbumSaga, delAlbumSaga, initAlbumSaga, updAlbumSaga } from "./album/sagas";
import { addImageSaga, delImageSaga, initImageSaga, updImageSaga } from "./image/sagas";

function* watchUserAuthentication() {
    yield* takeLatest(UserActionTypes.LOG_IN_START, loginSaga);
    yield* takeLatest(UserActionTypes.REGISTER_START, registerSaga);
    yield* takeLatest(UserActionTypes.CONFIRM_EMAIL_START, confirmEmailSaga);
    yield* takeLatest(UserActionTypes.CHANGE_PASSWORD_START, changePasswordSaga);
    yield* takeLatest(UserActionTypes.CONFIRM_CHANGE_PASSWORD_START, confirmChangePasswordSaga);
}

function* watchAlbum() {
    yield* takeLatest(AlbumActionTypes.INIT_ALBUM_START, initAlbumSaga);
    yield* takeLatest(AlbumActionTypes.ADD_ALBUM_START, addAlbumSaga);
    yield* takeLatest(AlbumActionTypes.DEL_ALBUM_START, delAlbumSaga);
    yield* takeLatest(AlbumActionTypes.UPD_ALBUM_START, updAlbumSaga);
}

function* watchImage() {
    yield* takeLatest(ImageActionTypes.INIT_IMAGES_START, initImageSaga);
    yield* takeLatest(ImageActionTypes.ADD_IMAGE_START, addImageSaga);
    yield* takeLatest(ImageActionTypes.UPD_IMAGE_START, updImageSaga);
    yield* takeLatest(ImageActionTypes.DEL_IMAGE_START, delImageSaga);
}

export default function* rootSaga() {
    yield* all([watchFetchDog(), watchUserAuthentication(), watchAlbum(), watchImage()]);
}
