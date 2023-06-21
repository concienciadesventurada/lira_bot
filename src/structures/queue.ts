export class Queue<T> {
  // TODO: Implement it as a singleton to prevent multiple queues?
  public queue: T[] = [];
  public limit: number;

  constructor(limit: number = Number.MAX_SAFE_INTEGER) {
    this.limit = limit;
  }

  enqueue(item: T): void {
    if (this.length() < this.limit) {
      this.queue.push(item);
    } else {
      throw new Error("Queue overflow");
    }
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("Queue underflow");
    }

    return this.queue.shift() as T;
  }

  length(): number {
    return this.queue.length;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  peek(): T | undefined {
    return this.queue[0];
  }

  tail(): T | undefined {
    return this.queue[this.length() - 1];
  }
}
