export type TStack<T> = {
  getStack: () => T[];
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => void;
  getSize: () => number;
};

export class Stack<T> implements TStack<T> {
  private container: T[] = [];

  getStack = () => this.container;

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container[this.getSize() - 1]) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    const peak = this.container[this.getSize() - 1] || null;
    return peak;
  };

  clear = (): void => {
    this.container.length = 0;
  };

  getSize = () => this.container.length;
}
