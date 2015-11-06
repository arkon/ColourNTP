class FixedStack {

    /**
     * A "stack" with a fixed size. If an item is pushed to the stack and
     * the stack is "full", the first item is removed.
     */
    constructor (maxSize, stack) {
        this.maxSize = maxSize;
        this.stack = stack || [];
    }

    push (item) {
        this.stack.push(item);

        this.stack.splice(0, this.stack.length - this.maxSize);
    }

    getArray () {
        return this.stack;
    }
}

export default FixedStack;
