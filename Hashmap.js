import createList from './linkedlist.js';

export default class HashMap {
  constructor() {
    this.buckets = [];
    this.mod = 16;
    this.capacity = 0;
    this.loadFactor = 0.75;
    this.initBucket(16);
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

  calcLoad() {
    const currLoad = this.capacity / this.buckets.length;
    console.log(`Current load: ${currLoad}`);
    if (currLoad >= this.loadFactor) console.log('too high load');
  }

  increaseCapacity() {
    this.capacity += 1;
    this.calcLoad();
  }

  updateValue(hashkey, value, indx) {
    this.buckets[hashkey].updateValue(value, indx);
  }

  appendKey(hashkey, key, value) {
    this.buckets[hashkey].append(key, value);
    this.increaseCapacity();
  }

  compareKey(hashkey, key, value) {
    const indx = this.buckets[hashkey].find(key);
    if (indx !== false) {
      this.updateValue(hashkey, value, indx);
    } else {
      this.appendKey(hashkey, key, value);
    }
  }

  has(key) {
    const hashkey = this.hash(key);
  }

  get(key) {
    const hashkey = this.hash(key);
    const node = this.buckets[hashkey].getNodeWithKey(key);
    if (node !== false) return node.value;
    return null;
  }

  set(key, value) {
    const hashkey = this.hash(key);
    console.log(hashkey);
    if (this.buckets[hashkey].getSize() === 0) {
      this.checkBucketsLength(hashkey);
      this.buckets[hashkey].append(key, value);
      this.increaseCapacity();
      return;
    }
    this.compareKey(hashkey, key, value);
  }
}
