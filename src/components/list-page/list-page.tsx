import React, { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';

import { INode, LinkedList } from './utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import {
  changeElementsState,
  cloneState,
  timeoutPromise,
} from '../../utils/utils';

import { TCharElement } from '../../types/sorting';
import { ElementStates } from '../../types/element-states';
import { Action } from '../../types/direction';

import styles from './list-page.module.css';

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [indexValue, setIndexValue] = useState<string>('');
  const [loader, setLoader] = useState<Action | null>(null);
  const [listElements, setListElements] = useState<TCharElement[]>([]);

  const list = useMemo(() => new LinkedList<string>(), []);

  const initialChars = useMemo(() => ['H', 'E', 'L', 'L', 'O'], []);

  useEffect(() => {
    initialChars.forEach((char, index) => list.insertAt(char, index));
    const initialList = initialChars.map((char, index) => {
      const isHead = index === 0 ? 'head' : undefined;
      const isTail = index === list.getSize() - 1 ? 'tail' : undefined;
      return { char, id: nanoid(), head: isHead, tail: isTail };
    });
    setListElements(initialList);
  }, [list, initialChars]);

  const insertFirstElement = async () => {
    const newChar = (
      <Circle letter={value} state={ElementStates.Changing} isSmall />
    );
    setValue('');
    setIndexValue('');
    listElements.push({
      char: '',
      id: nanoid(),
      head: newChar,
      tail: 'tail',
    });
    setListElements(cloneState(listElements));
    await timeoutPromise(SHORT_DELAY_IN_MS);

    listElements[0].head = 'head';
    listElements[0].state = ElementStates.Modified;
    const node = list.getHead();
    if (node) {
      listElements[0].char = node.value;
    }

    setListElements(cloneState(listElements));
    await timeoutPromise(SHORT_DELAY_IN_MS);

    listElements[0].state = ElementStates.Default;
    setListElements(cloneState(listElements));
  };

  const insertElement = async (index: number) => {
    const newChar = (
      <Circle letter={value} state={ElementStates.Changing} isSmall />
    );

    setValue('');
    setIndexValue('');
    //console.log(value);
    let curr = list.getHead() as INode<string>;
    let position = 0;

    let prevHead = listElements[position].head;
    listElements[position].head = newChar;
    setListElements(cloneState(listElements));

    await timeoutPromise(SHORT_DELAY_IN_MS);

    while (position < index) {
      listElements[position].head = prevHead;
      listElements[position].state = ElementStates.Changing;
      if (curr.next) {
        curr = curr.next;
      }
      position++;
      if (!listElements[position]) {
        listElements.push({
          char: '',
          id: nanoid(),
          head: position === 0 ? 'head' : undefined,
          tail: position === listElements.length ? 'tail' : undefined,
        });
      }
      if (position === listElements.length - 1) {
        listElements[listElements.length - 2].tail = undefined;
      }
      prevHead = listElements[position].head;
      listElements[position].head = newChar;
      setListElements(cloneState(listElements));
      await timeoutPromise(SHORT_DELAY_IN_MS);
    }

    listElements[position].head = prevHead;

    if (index === 0) {
      listElements[0].head = undefined;
    }

    if (position === list.getSize() - 1) {
      listElements[position].char = curr.value;
    } else {
      listElements.splice(position, 0, {
        char: curr.value,
        id: nanoid(),
        head: position === 0 ? 'head' : undefined,
        tail: position === listElements.length ? 'tail' : undefined,
      });
    }
    listElements[position].state = ElementStates.Modified;
    setListElements(cloneState(listElements));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    changeElementsState(listElements, ElementStates.Default);
    setListElements(cloneState(listElements));
  };

  const insertElementAtTail = async () => {
    setValue('');
    const newChar = (
      <Circle letter={value} state={ElementStates.Changing} isSmall />
    );
    listElements[listElements.length - 1].tail = undefined;
    listElements.push({
      char: '',
      id: nanoid(),
      head: newChar,
      tail: 'tail',
    });
    setListElements(cloneState(listElements));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    const tail = list.getTail() as INode<string>;
    listElements[listElements.length - 1].state = ElementStates.Modified;
    listElements[listElements.length - 1].char = tail.value;
    listElements[listElements.length - 1].head = undefined;
    setListElements(cloneState(listElements));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    listElements[listElements.length - 1].state = ElementStates.Default;
    setListElements(cloneState(listElements));
  };

  const removeElement = async (index: number) => {
    setIndexValue('');
    let position = 0;
    while (position < index) {
      listElements[position].state = ElementStates.Changing;
      position++;
      setListElements(cloneState(listElements));
      await timeoutPromise(SHORT_DELAY_IN_MS);
    }

    const charRemoved = (
      <Circle
        letter={listElements[position].char}
        state={ElementStates.Changing}
        isSmall
      />
    );

    listElements[position].char = '';
    listElements[position].tail = charRemoved;
    setListElements(cloneState(listElements));
    await timeoutPromise(SHORT_DELAY_IN_MS);

    if (position === 0 && list.getSize() > 0) {
      listElements[position + 1].head = 'head';
    }

    if (position === listElements.length - 1 && list.getSize() > 0) {
      listElements[position - 1].tail = 'tail';
    }

    listElements.splice(position, 1);
    changeElementsState(listElements, ElementStates.Default);
    setListElements(cloneState(listElements));
  };

  const visualizeInserting = async (index: number, loader: Action) => {
    setLoader(loader);
    list.insertAt(value, index);
    listElements.length > 0
      ? await insertElement(index)
      : await insertFirstElement();
    setLoader(null);
  };

  const visualizeInsertingAtTail = async () => {
    setLoader(Action.AddAtTail);
    list.insertAtTail(value);
    listElements.length > 0
      ? await insertElementAtTail()
      : await insertFirstElement();
    setLoader(null);
  };

  const visualizeRemoving = async (index: number, loader: Action) => {
    setLoader(loader);
    list.removeFrom(index);
    await removeElement(index);
    setLoader(null);
  };

  return (
    <SolutionLayout title="Связный список">
      <div data-testid="list" className={styles.wrapper}>
        <fieldset className={styles.fieldset}>
          <Input
            maxLength={4}
            isLimitText
            extraClass={styles.input}
            value={value}
            onChange={(evt) => setValue(evt.currentTarget.value)}
            data-testid="value-input"
          />
          <Button
            text="Добавить в head"
            extraClass={styles.button}
            onClick={() => visualizeInserting(0, Action.AddAtHead)}
            disabled={list.getSize() === 10 || loader !== null || !value}
            isLoader={loader === Action.AddAtHead}
            data-testid="add-head-button"
          />
          <Button
            text="Добавить в tail"
            extraClass={styles.button}
            onClick={visualizeInsertingAtTail}
            disabled={list.getSize() === 10 || loader !== null || !value}
            isLoader={loader === Action.AddAtTail}
            data-testid="add-tail-button"
          />
          <Button
            text="Удалить из head"
            extraClass={styles.button}
            onClick={() => visualizeRemoving(0, Action.DeleteFromHead)}
            disabled={list.getSize() === 0 || loader !== null}
            isLoader={loader === Action.DeleteFromHead}
            data-testid="delete-head-button"
          />
          <Button
            text="Удалить из tail"
            extraClass={styles.button}
            onClick={() =>
              visualizeRemoving(list.getSize() - 1, Action.DeleteFromTail)
            }
            disabled={list.getSize() === 0 || loader !== null}
            isLoader={loader === Action.DeleteFromTail}
            data-testid="delete-tail-button"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            type="number"
            min={0}
            max={listElements.length}
            maxLength={1}
            isLimitText
            extraClass={styles.input}
            placeholder="Введите индекс"
            value={indexValue}
            onChange={(evt) => setIndexValue(evt.currentTarget.value)}
            data-testid="index-input"
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.button_wide}
            onClick={() => visualizeInserting(Number(indexValue), Action.AddAt)}
            disabled={
              !indexValue ||
              Number(indexValue) > list.getSize() ||
              list.getSize() === 10 ||
              loader !== null ||
              !value
            }
            isLoader={loader === Action.AddAt}
            data-testid="add-index-button"
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.button_wide}
            onClick={() =>
              visualizeRemoving(Number(indexValue), Action.DeleteFrom)
            }
            disabled={
              !indexValue ||
              Number(indexValue) < 0 ||
              Number(indexValue) > list.getSize() - 1 ||
              list.getSize() === 0 ||
              loader !== null
            }
            isLoader={loader === Action.DeleteFrom}
            data-testid="delete-index-button"
          />
        </fieldset>
        <div className={styles.list}>
          {listElements.length > 0 &&
            listElements.map((element, index) => (
              <div className={styles.elementWrapper} key={element.id}>
                <Circle
                  letter={element.char}
                  head={element.head}
                  tail={element.tail}
                  state={element.state}
                  index={index}
                />
                {index < listElements.length - 1 && <ArrowIcon />}
              </div>
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
