import createList from './linkedlist.js';

export default class HashMap {
  constructor() {
    this.buckets = [];
    this.mod = 16;
    this.capacity = 0;
    this.loadFactor = 0.75;
    this.initBucket(this.mod);
  }

  hash(key) {
    this.hashCode = 0;
    const primeN = 31;
    for (let i = 0; i < key.length; i += 1) {
      this.hashCode = (primeN * this.hashCode + key.charCodeAt(i)) % this.mod;
    }
    return this.hashCode;
  }

  initBucket(size) {
    for (let i = 0; i < size; i += 1) {
      const newList = createList();
      this.buckets[i] = newList;
    }
  }

  checkBucketsLength(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
  }

  getArray(callback) {
    const total = [];
    for (let i = 0; i < this.mod; i += 1) {
      const size = this.buckets[i].getSize();
      if (size > 0) {
        for (let x = 0; x < size; x += 1) {
          const data = callback(this.buckets[i].at(x));
          total.push(data);
        }
      }
    }
    return total;
  }

  keys() {
    const callback = function callback(input) {
      return input.key;
    };
    return this.getArray(callback);
  }

  values() {
    const callback = function callback(input) {
      return input.key;
    };
    return this.getArray(callback);
  }

  entries() {
    const callback = function callback(input) {
      return [input.key, input.value];
    };
    return this.getArray(callback);
  }

  clear() {
    this.initBucket(this.mod);
  }

  length() {
    let total = 0;
    for (let i = 0; i < this.mod; i += 1) {
      total += this.buckets[i].getSize();
    }
    return total;
  }

  increaseLoad() {
    // const ogArray = this.buckets;
    console.log('increasing');
    const entries = this.entries();
    this.buckets = [];
    this.mod *= 2;
    this.capacity = 0;
    this.initBucket(this.mod);
    entries.forEach(entry => {
      this.set(entry[0], entry[1]);
    });
  }

  calcLoad() {
    const currLoad = this.capacity / this.buckets.length;
    console.log(`Current load: ${currLoad}`);
    if (currLoad >= this.loadFactor) this.increaseLoad();
  }

  increaseCapacity() {
    this.capacity += 1;
    this.calcLoad();
  }

  decreaseCapacity() {
    this.capacity -= 1;
    this.calcLoad();
  }

  updateValue(hashkey, value, indx) {
    this.buckets[hashkey].updateValue(value, indx);
  }

  appendKey(hashkey, key, value) {
    this.buckets[hashkey].append(key, value);
  }

  compareKey(hashkey, key, value) {
    const indx = this.buckets[hashkey].find(key);
    if (indx !== false) {
      this.updateValue(hashkey, value, indx);
    } else {
      this.appendKey(hashkey, key, value);
    }
  }

  remove(key) {
    const hashkey = this.hash(key);
    const indx = this.buckets[hashkey].find(key);
    if (indx !== false) {
      this.decreaseCapacity();
      return this.buckets[hashkey].removeAt(indx);
    }
    return false;
  }

  has(key) {
    const hashkey = this.hash(key);
    return this.buckets[hashkey].contains(key);
  }

  get(key) {
    const hashkey = this.hash(key);
    const node = this.buckets[hashkey].getNodeWithKey(key);
    if (node !== false) return node.value;
    return null;
  }

  set(key, value) {
    const hashkey = this.hash(key);
    if (this.buckets[hashkey].getSize() === 0) {
      this.checkBucketsLength(hashkey);
      this.buckets[hashkey].append(key, value);
      this.increaseCapacity();
      return;
    }
    this.compareKey(hashkey, key, value);
  }
}
