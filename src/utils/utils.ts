import { ElementStates } from '../types/element-states';

export const swap = <T>(array: T[], i: number, j: number) => {
  [array[i], array[j]] = [array[j], array[i]];
};

export const changeElementsState = (elements: any[], state: ElementStates) => {
  elements.forEach((element) => (element.state = state));
};

export const timeoutPromise = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const cloneState = <T>(state: T[]) =>
  state.map((element) => ({ ...element }));

export const rightEnd = (num: number, forms: string[]) => {
  num = Math.abs(num) % 100;
  const numInTen = num % 10;
  if (num > 10 && num < 20) {
    return forms[2];
  }
  if (numInTen > 1 && numInTen < 5) {
    return forms[1];
  }
  if (numInTen === 1) {
    return forms[0];
  }
  return forms[2];
};
