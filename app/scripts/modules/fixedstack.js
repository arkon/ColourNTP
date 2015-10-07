class FixedStack {

    /**
     * A "stack" with a fixed size. If an item is pushed to the stack and
     * the stack is "full", the first item is removed.
     */
    constructor (private maxSize, private stack = []) { }

    push (item) {
        this.stack.push(item);

        this.stack.splice(0, this.stack.length - this.maxSize);
    }

    get (index) {
        return this.stack[index];
    }
}

export default FixedStack;
