import createList from './linkedlist.js';

export default class HashMap {
  constructor() {
    this.buckets = new Array(16);
    this.mod = 16;
    this.capacity = 0;
    this.loadFactor = 0.75;
  }

  checkBucketsLength(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
  }

  hash(key) {
    this.hashCode = 0;
    const primeN = 31;
    for (let i = 0; i < key.length; i += 1) {
      this.hashCode = (primeN * this.hashCode + key.charCodeAt(i)) % this.mod;
    }
    return this.hashCode;
  }

  calcLoad() {
    const currLoad = this.capacity / this.buckets.length;
    console.log(`Current load: ${currLoad}`);
    if (currLoad >= this.loadFactor) console.log('too high load');
  }

  increaseCapacity() {
    this.capacity += 1;
  }

  set(key, value) {
    const node = { [key]: value };
    const hashkey = this.hash(key);
    if (this.buckets[hashkey] === undefined) {
      this.checkBucketsLength(hashkey);
      this.buckets[hashkey] = node;
      this.increaseCapacity();
      this.calcLoad();
    }
  }
}
