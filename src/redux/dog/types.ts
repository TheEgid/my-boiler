export enum DogActionTypes {
    FETCH_DOG = "FETCH_DOG",
}

export interface IDogState {
    url: string;
    loading: boolean;
    error: boolean;
}

export interface IDogData {
    message: string;
    status: string;
}
