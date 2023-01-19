import { createAction } from "@reduxjs/toolkit";
import { DogActionTypes } from "./types";

export const fetchDog = createAction(DogActionTypes.FETCH_DOG);
