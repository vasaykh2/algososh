import { changeElementsState, swap, timeoutPromise } from '../../utils/utils';
import { TCharElement } from '../../types/sorting';
import React from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';

export const reverse = async (
  elements: TCharElement[],
  state: React.Dispatch<React.SetStateAction<TCharElement[]>>,
  timeout: number
) => {
  let start = 0;
  let end = elements.length - 1;
  while (start <= end) {
    await timeoutPromise(timeout);
    changeElementsState(
      [elements[start], elements[end]],
      ElementStates.Changing
    );
    state([...elements]);
    await timeoutPromise(DELAY_IN_MS);
    swap(elements, start, end);
    changeElementsState(
      [elements[start], elements[end]],
      ElementStates.Modified
    );
    state([...elements]);
    start++;
    end--;
  }
};

export const assembleElementsArray = (value: string): TCharElement[] =>
  value.split("").map((char, index) => ({
    char,
    id: index,
    state: ElementStates.Default,
  }));