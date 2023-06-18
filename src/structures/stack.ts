export class Stack<T> {
  public stack: T[] = [];
  public limit: number;
  public length: number = this.stack.length;

  constructor(limit: number = Number.MAX_SAFE_INTEGER) {
    this.limit = limit;
  }

  push(item: T) {
    if (this.length > this.limit) {
      throw new Error("Stack overflow");
    }

    this.stack.push(item);
    this.length++;
  }

  pop(): T {
    if (this.length === 0) {
      throw new Error("Stack underflow");
    }

    this.length--;
    return this.stack.pop() as T;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  top(): T | null {
    if (this.isEmpty()) return null;

    return this.stack[this.length - 1];
  }
}
