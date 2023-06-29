export default class DoublyLinkedList<T> {
  private head?: DoublyLinkedListNode<T> = undefined;
  private tail?: DoublyLinkedListNode<T> = undefined;
  private length: number = 0;

  isEmpty(): boolean {
    return !this.head;
  }

  getLength(): number {
    return this.length;
  }

  get(idx: number): T | null {
    if (idx < 0 || idx >= this.length) {
      return null;
    }

    let currNode: DoublyLinkedListNode<T> | undefined = this.head;

    for (let i: number = 0; i < idx; i++) {
      currNode = currNode?.next;
    }

    return currNode?.value ?? null;
  }

  push(value: T): void {
    const newNode = new DoublyLinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  pop(): T {
    if (!this.head) {
      throw new Error("Index out of bounds");
    }

    const removedNode = this.head;

    if (this.head === this.tail) {
      this.tail = undefined;
    } else {
      this.head.next!.prev = undefined;
    }

    this.head = this.head.next;
    this.length--;

    return removedNode.value;
  }
}

export class DoublyLinkedListNode<T> {
  constructor(
    public value: T,
    public next?: DoublyLinkedListNode<T>,
    public prev?: DoublyLinkedListNode<T>
  ) {}
}
