export const generateFibonacciArray = (number: number): number[] => {
  let arr: number[] = [0, 1];
  for (let i = 2; i <= number; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr.slice(0, number + 1);
};
