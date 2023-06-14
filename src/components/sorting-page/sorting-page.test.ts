import { TBarElement } from '../../types/sorting';
import { sortBubble, sortSelection } from './utils';
import { Direction } from '../../types/direction';

const testArrays = [[8, 3, 4, 0, 5, 21], [2], []];

const [severalElementsArray, singleElementArray, emptyArray] = testArrays.map(
  (array) => array.map((number, index) => ({ number, id: index }))
);

const assembleArrayBack = (array: TBarElement[] | []) =>
  array.map((element) => element.number);

const mock = jest.fn();

describe('Selection sort algorithm', () => {
  it('Should sort an array in ascending order', async function () {
    await sortSelection(severalElementsArray, Direction.Ascending, mock, 0);
    expect(assembleArrayBack(severalElementsArray)).toEqual([
      0, 3, 4, 5, 8, 21,
    ]);
  });

  it('Should sort an array in descending order', async function () {
    await sortSelection(severalElementsArray, Direction.Descending, mock, 0);
    expect(assembleArrayBack(severalElementsArray)).toEqual([
      21, 8, 5, 4, 3, 0,
    ]);
  });

  it('Should sort a single element array', async function () {
    await sortSelection(singleElementArray, Direction.Ascending, mock, 0);
    expect(assembleArrayBack(singleElementArray)).toEqual([2]);
  });

  it('Should sort an empty array', async function () {
    await sortSelection(emptyArray, Direction.Ascending, mock, 0);
    expect(assembleArrayBack(emptyArray)).toEqual([]);
  });
});

describe('Bubble sort algorithm', () => {
  it('Should sort an array in ascending order', async function () {
    await sortBubble(severalElementsArray, Direction.Ascending, mock, 0);
    expect(assembleArrayBack(severalElementsArray)).toEqual([
      0, 3, 4, 5, 8, 21,
    ]);
  });

  it('Should sort an array in descending order', async function () {
    await sortBubble(severalElementsArray, Direction.Descending, mock, 0);
    expect(assembleArrayBack(severalElementsArray)).toEqual([
      21, 8, 5, 4, 3, 0,
    ]);
  });

  it('Should sort a single element array', async function () {
    await sortBubble(singleElementArray, Direction.Ascending, mock, 0);
    expect(assembleArrayBack(singleElementArray)).toEqual([2]);
  });

  it('Should sort an empty array', async function () {
    await sortBubble(emptyArray, Direction.Ascending, mock, 0);
    expect(assembleArrayBack(emptyArray)).toEqual([]);
  });
});
