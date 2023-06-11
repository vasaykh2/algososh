export interface INode<T> {
  value: T;
  next: Node<T> | null;
}

export class Node<T> implements INode<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  insertAt: (element: T, index: number) => void;
  removeFrom: (index: number) => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insertAt(element: T, position: number) {
    if (position < 0 || position > this.size) {
      throw new Error('Enter a valid index');
    } else {
      const node = new Node(element);

      if (position === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (curr && currIndex < position - 1) {
          curr = curr.next;
          currIndex++;
        }

        node.next = curr?.next || null;
        if (curr) {
          curr.next = node;
        }
      }

      this.size++;

      if (position === this.size - 1) {
        this.tail = node;
      }
    }
  }

  insertAtTail(element: T) {
    const node = new Node(element);
    if (!this.tail) {
      this.tail = node;
      this.head = node;
    } else {
      const prevTail = this.tail;
      prevTail.next = node;
      this.tail = node;
    }

    this.size++;
  }

  removeFrom(position: number) {
    if (position < 0 || position > this.size || !this.head) {
      throw new Error('Enter a valid index');
    } else {
      let curr = this.head;
      let currIndex = 0;

      while (curr.next && currIndex < position - 1) {
        curr = curr.next;
        currIndex++;
      }

      if (curr.next !== null) {
        const nodeRemoved = curr.next;
        curr.next = nodeRemoved.next;
        nodeRemoved.next = null;
      }

      this.size--;

      if (curr.next === null) {
        this.tail = curr;
      }
    }
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }
}
