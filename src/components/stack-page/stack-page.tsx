import React, { useMemo, useState } from 'react';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';

import {
  changeElementsState,
  cloneState,
  timeoutPromise,
} from '../../utils/utils';
import { Stack } from './utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

import { TCharElement } from '../../types/sorting';
import { ElementStates } from '../../types/element-states';
import { Action } from '../../types/direction';

import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [stackElements, setStackElements] = useState<TCharElement[]>([]);
  const [loader, setLoader] = useState<Action | null>(null);

  const stack = useMemo(() => new Stack<TCharElement>(), []);

  const clearPrevPeak = () => {
    const prevPeak = stack.peak();
    if (prevPeak) {
      prevPeak.head = undefined;
    }
  };

  const setNewPeak = () => {
    const newPeak = stack.peak();
    if (newPeak) {
      newPeak.head = 'top';
    }
  };

  const visualizePushing = async () => {
    setLoader(Action.Add);
    setValue('');
    const newElement: TCharElement = {
      char: value,
      id: stack.getSize(),
      head: 'top',
    };
    //console.log(newElement);
    clearPrevPeak();
    stack.push(newElement);
    //console.log(stack);
    changeElementsState([stack.peak()], ElementStates.Changing);
    setStackElements(cloneState(stack.getStack()));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    changeElementsState([stack.peak()], ElementStates.Default);
    setStackElements(cloneState(stack.getStack()));
    setLoader(null);
    //console.log(stackElements);
  };

  const visualizePopping = async () => {
    setLoader(Action.Delete);
    const prevPeak = stack.peak();
    if (prevPeak) {
      changeElementsState([prevPeak], ElementStates.Changing);
    }
    setStackElements(cloneState(stack.getStack()));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    clearPrevPeak();
    stack.pop();
    setNewPeak();
    setStackElements(cloneState(stack.getStack()));
    setLoader(null);
  };

  const clearStack = () => {
    stack.clear();
    setStackElements(cloneState(stack.getStack()));
    //console.log(stack);
    //console.log(stackElements);
  };

  return (
    <SolutionLayout title="Стек">
      <div data-testid="stack" className={styles.wrapper}>
        <fieldset className={styles.fieldset}>
          <Input
            value={value}
            onChange={(evt) => setValue(evt.currentTarget.value)}
            maxLength={4}
            isLimitText
            extraClass={styles.input}
            data-testid="value-input"
          />
          <div className={styles.buttons}>
            <Button
              text="Добавить"
              extraClass={styles.button}
              onClick={visualizePushing}
              disabled={!value || loader !== null || stack.getSize() >= 10}
              isLoader={loader === Action.Add}
              data-testid="add-button"
            />
            <Button
              text="Удалить"
              extraClass={styles.button}
              onClick={visualizePopping}
              disabled={!stack.peak() || loader !== null}
              isLoader={loader === Action.Delete}
              data-testid="delete-button"
            />
            <div className={styles.buttonClear}>
              <Button
                text="Очистить"
                extraClass={styles.button}
                onClick={clearStack}
                disabled={!stack.peak() || loader !== null}
                data-testid="clear-button"
              />
            </div>
          </div>
        </fieldset>
        <div className={styles.stack}>
          {stackElements.length > 0 &&
            stackElements.map((element, index) => (
              <Circle
                letter={element.char}
                key={element.id}
                head={element.head}
                state={element.state}
                index={index}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
