interface IQueue<T> {
  getSize: () => number;
  getLength: () => number;
  getQueue: () => (T | null)[];
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHead: () => number | null;
  getTail: () => number | null;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private readonly container: (T | null)[] = [];
  private head: number | null = null;
  private tail: number | null = null;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  getSize = () => this.size;

  getLength = () => this.length;

  getQueue = () => this.container;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }

    this.length += 1;
    this.tail = this.tail !== null ? (this.tail + 1) % this.size : 0;
    this.container[this.tail] = item;
    if (this.head === null) {
      this.head = 0;
    }
  };

  dequeue = () => {
    if (this.head === null) {
      throw new Error('No elements in the queue');
    }

    delete this.container[this.head];
    this.length -= 1;
    if (this.length) {
      this.head = (this.head + 1) % this.size;
    } else {
      this.clear();
    }
  };

  getHead = (): number | null => {
    return this.head;
  };

  getTail = (): number | null => {
    return this.tail;
  };

  clear = () => {
    this.length = 0;
    this.head = null;
    this.tail = null;
  };
}
