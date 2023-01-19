import ky, { BeforeErrorHook, BeforeRequestHook, BeforeRetryHook } from "ky";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import store from "./store";
import { UserLogOut, UserRefreshSuccess } from "./auth/reducers";
import { getUser } from "./auth/selectors";
import { IErrorResponse, ILoginResponse } from "./auth/types";

const apiPathUrl = "/api/";

const apiUrl = process.env.NODE_ENV === "development" ? `http://localhost:3000${apiPathUrl}` : apiPathUrl;

const beforeRequest: BeforeRequestHook = (request) => {
    const currentUser = getUser(store.getState());

    if (currentUser && currentUser.accessToken) {
        request.headers.set("Authorization", `Bearer ${currentUser.accessToken}`);
    }
};

const beforeError: BeforeErrorHook = async (error) => {
    const { response } = error;

    if (response && response.body) {
        const customError = (await response.json()) as IErrorResponse;

        error.name = customError.error;
        error.message = customError.message;
    }

    return error;
};

const beforeRetry: BeforeRetryHook = async () => {
    const currentRefreshToken = getCookie("refreshToken");

    if (currentRefreshToken) {
        const currentUser = getUser(store.getState());
        const tokens: ILoginResponse = await ky
            .post(`${apiUrl}auth/refresh`, {
                headers: {
                    Authorization: `Bearer ${currentRefreshToken}`,
                },
            })
            .json();
        const updatedUser = { ...currentUser, ...tokens };

        store.dispatch(UserRefreshSuccess(updatedUser));
    } else {
        store.dispatch(UserLogOut());
        const navigate = useNavigate();

        navigate("/");
    }
};

export const apiRoot = ky.create({
    prefixUrl: apiUrl,
    credentials: "include",
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    retry: {
        limit: 3,
        methods: ["get", "post"],
        statusCodes: [403],
        backoffLimit: 3000,
    },
    hooks: {
        beforeRequest: [beforeRequest],
        beforeError: [beforeError],
        beforeRetry: [beforeRetry],
    },
});

export const apiFileUrl = apiUrl.replace("/api/", "/files/");
