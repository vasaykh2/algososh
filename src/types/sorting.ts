import {ElementStates} from "./element-states";
import React from "react";

export type TCharElement = {
    char: string;
    id: number | string;
    state?: ElementStates;
    head?: string | React.ReactElement;
    tail?: string | React.ReactElement;
}

export type TBarElement = {
    number: number,
    id: number,
    state?: ElementStates;
}

export type TRandomArrayOptions = {
    minNumber: number;
    maxNumber: number;
    minLength: number;
    maxLength: number;
}

export enum SortingWay {
    Bubble = "bubble",
    Selection = "selection",
}