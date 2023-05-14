import React, { useEffect, useMemo, useState } from 'react';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import { Queue } from './utils';
import { cloneState, timeoutPromise } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

import { TCharElement } from '../../types/sorting';
import { ElementStates } from '../../types/element-states';
import { Action } from '../../types/direction';

import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('');
  const [queueElements, setQueueElements] = useState<TCharElement[]>([]);
  const [loader, setLoaderPosition] = useState<Action | null>(null);

  const queue = useMemo(() => new Queue<string>(7), []);

  const initialElements = useMemo(() => {
    const array: TCharElement[] = [];
    for (let i = 0; i < queue.getSize(); i++) {
      array.push({
        char: '',
        id: i,
      });
    }
    return array;
  }, [queue]);

  useEffect(() => {
    setQueueElements(cloneState(initialElements));
  }, [initialElements]);

  const addElement = async () => {
    setValue('');
    const tail = queue.getTail() as number;
    const char = queue.getQueue()[tail] as string;
    if (queue.getLength() > 1) {
      queueElements[tail] = {
        ...queueElements[tail],
        tail: 'tail',
        char,
        state: ElementStates.Changing,
      };
      const prevTail = tail - 1 >= 0 ? tail - 1 : queue.getSize() - 1;
      queueElements[prevTail] = {
        ...queueElements[prevTail],
        tail: undefined,
      };
    } else {
      queueElements[tail] = {
        ...queueElements[tail],
        tail: 'tail',
        head: 'head',
        char,
        state: ElementStates.Changing,
      };
    }
    setQueueElements(cloneState(queueElements));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    queueElements[tail] = {
      ...queueElements[tail],
      state: ElementStates.Default,
    };
    setQueueElements(cloneState(queueElements));
  };

  const deleteElement = async () => {
    const head = queue.getHead() as number;
    queueElements[head] = {
      ...queueElements[head],
      state: ElementStates.Changing,
    };
    setQueueElements(cloneState(queueElements));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    queueElements[head] = {
      ...queueElements[head],
      head: undefined,
      tail: undefined,
      char: '',
      state: ElementStates.Default,
    };
    if (queue.getLength() > 1) {
      const newHead = (head + 1) % queue.getSize();
      queueElements[newHead] = {
        ...queueElements[newHead],
        head: 'head',
      };
    }
    setQueueElements(cloneState(queueElements));
  };

  const clearQueue = () => {
    queue.clear();
    setQueueElements(cloneState(initialElements));
  };

  const visualizeEnqueuing = async () => {
    setLoaderPosition(Action.Add);
    queue.enqueue(value);
    await addElement();
    setLoaderPosition(null);
  };

  const visualizeDequeuing = async () => {
    setLoaderPosition(Action.Delete);
    await deleteElement();
    queue.dequeue();
    setLoaderPosition(null);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <div className={styles.fieldset}>
          <Input
            value={value}
            onChange={(evt) => setValue(evt.currentTarget.value)}
            maxLength={4}
            isLimitText
            extraClass={styles.input}
          />
          <div className={styles.buttons}>
            <Button
              text="Добавить"
              extraClass={styles.button}
              onClick={visualizeEnqueuing}
              disabled={
                queue.getLength() === queue.getSize() ||
                loader !== null ||
                !value
              }
              isLoader={loader === Action.Add}
            />
            <Button
              text="Удалить"
              extraClass={styles.button}
              onClick={visualizeDequeuing}
              disabled={queue.getLength() === 0 || loader !== null}
              isLoader={loader === Action.Delete}
            />
            <div className={styles.buttonClear}>
              <Button
                text="Очистить"
                extraClass={styles.button}
                onClick={clearQueue}
                disabled={queue.getLength() === 0 || loader !== null}
              />
            </div>
          </div>
        </div>
        <div className={styles.queue}>
          {queueElements.length > 0 &&
            queueElements.map((element, index) => (
              <Circle
                letter={element.char}
                key={element.id}
                state={element.state}
                index={index}
                tail={element.tail}
                head={element.head}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
