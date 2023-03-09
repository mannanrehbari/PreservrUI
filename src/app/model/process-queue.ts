import { Process } from "./process";

export class ProcessQueue {
    private data: Process[][] = [];
    private maxSize: number;

    constructor(maxSize: number) {
        this.maxSize = maxSize;
    }
    // Add an item to the back of the queue
    enqueue(item: Process[]) {
        if (this.data.length >= this.maxSize) {
            this.dequeue();
        }
        this.data.push(item);
    }

    // Remove and return the item at the front of the queue
    dequeue(): Process[] | undefined {
        return this.data.shift();
    }

    // Return the item at the front of the queue without removing it
    peek(): Process[] | undefined {
        return this.data[0];
    }

    lastList(): Process[] {
        return this.data[this.data.length-1]
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.data.length === 0;
    }

    // Get the number of items in the queue
    size(): number {
        return this.data.length;
    }

    // Clear the queue
    clear() {
        this.data = [];
    }

    at(index: number): Process[] {
        return this.data[index]
    }

    currentProcessData() {
        return this.data
    }
}
