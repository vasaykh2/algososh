import React, { useEffect, useState } from 'react';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';

import { generateArray, sortBubble, sortSelection } from './utils';
import { randomArrayOptions } from '../../constants/random-array';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

import { Sorting, TBarElement } from '../../types/sorting';
import { Direction } from '../../types/direction';

import styles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
  const [sorting, setSortingWay] = useState<Sorting>(Sorting.Selection);
  const [array, setArray] = useState<TBarElement[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [direction, setDirection] = useState<Direction | null>(null);

  useEffect(() => {
    setArray(generateArray(randomArrayOptions));
  }, []);

  const visualizeAlgorithm = async (direction: Direction) => {
    setIsRunning(true);
    setDirection(direction);
    sorting === Sorting.Selection
      ? await sortSelection(array, direction, setArray, SHORT_DELAY_IN_MS)
      : await sortBubble(array, direction, setArray, SHORT_DELAY_IN_MS);
    setIsRunning(false);
    setDirection(null);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div data-testid="sorting" className={styles.wrapper}>
        <div className={styles.radioButtons}>
          <RadioInput
            name="sorting"
            label="Выбор"
            checked={sorting === 'selection'}
            onChange={() => setSortingWay(Sorting.Selection)}
            disabled={isRunning}
          />
          <RadioInput
            name="sorting"
            label="Пузырёк"
            checked={sorting === 'bubble'}
            onChange={() => setSortingWay(Sorting.Bubble)}
            disabled={isRunning}
          />
        </div>
        <div className={styles.directionButtons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass={styles.button}
            onClick={() => visualizeAlgorithm(Direction.Ascending)}
            disabled={isRunning}
            isLoader={direction === Direction.Ascending}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            extraClass={styles.button}
            onClick={() => visualizeAlgorithm(Direction.Descending)}
            disabled={isRunning}
            isLoader={direction === Direction.Descending}
          />
        </div>
        <Button
          text="Новый массив"
          extraClass={`${styles.button} ${styles.generateButton}`}
          onClick={() => setArray(generateArray(randomArrayOptions))}
          disabled={isRunning}
        />
        <div className={styles.algorithm}>
          {array.length > 0 &&
            array.map((element) => (
              <Column
                index={element.number}
                key={element.id}
                state={element.state}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
