import { TCharElement } from '../../types/sorting';
import { assembleElementsArray, reverse } from './utils';

const strings = ['testeven', 'testodd', 't', ''];

const [evenChars, oddChars, singleChar, emptyString] = strings.map((string) =>
  assembleElementsArray(string)
);

const assembleStringBack = (array: TCharElement[]) =>
  array.reduce((acc, element) => (acc += element.char), '');

const mock = jest.fn();

describe('String', () => {
  it('Should reverse a string with an even number of chars', async function () {
    await reverse(evenChars, mock, 0);
    expect(assembleStringBack(evenChars)).toEqual('nevetset');
  });

  it('Should reverse a string with an odd number of chars', async function () {
    await reverse(oddChars, mock, 0);
    expect(assembleStringBack(oddChars)).toEqual('ddotset');
  });

  it('Should reverse a string with a single char', async function () {
    await reverse(singleChar, mock, 0);
    expect(assembleStringBack(singleChar)).toEqual('t');
  });

  it('Should reverse an empty string', async function () {
    await reverse(emptyString, mock, 0);
    expect(assembleStringBack(emptyString)).toEqual('');
  });
});