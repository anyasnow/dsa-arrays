const memory = require('./memory.js')

class anyArray {
    constructor() {
        this.memory = new memory()
        this.length = 0;
        this._capacity = 0;
        this.ptr = this.memory.allocate(this.length)

    }

    push(value) {
        if (this.length >= this._capacity) {

            this._resize((this.length + 1) * anyArray.SIZE_RATIO)
            console.log('insideushif', this._capacity)
        }
        this.memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = this.memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('out of tmemory');
        }
        this.memory.copy(this.ptr, oldPtr, this.length);
        this.memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return this.memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = this.memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * anyArray.SIZE_RATIO);
        }

        this.memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        this.memory.set(this.ptr + index, value);
        this.length++;
    }
}
anyArray.SIZE_RATIO = 5;

const myNewArray = new anyArray();
console.log('b', myNewArray)
myNewArray.push(5);
myNewArray.push(15);
myNewArray.push(19);
myNewArray.push(45);
myNewArray.push(10);
myNewArray.pop();
myNewArray.pop();
myNewArray.pop();
console.log(myNewArray.get(0));
console.log(myNewArray.get(1))



console.log('a', myNewArray)
