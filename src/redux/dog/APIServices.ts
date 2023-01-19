import { IDogData } from "./types";
import { apiRoot } from "../api";

export const getDogData = async (): Promise<IDogData> => {
    return apiRoot.get("some-path").json();
};
