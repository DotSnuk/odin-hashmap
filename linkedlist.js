import createNode from './nodefactory.js';

export default function createList() {
  let head = createNode();
  let size = 0;

  const findNull = node => {
    if (node.next === null) {
      return node;
    }
    return findNull(node.next);
  };

  const findSecondLastNull = node => {
    if (node.next.next === null) return node;
    return findSecondLastNull(node.next);
  };

  const getHead = () => head;

  const tail = () => findNull(getHead());

  const increaseSize = () => {
    size += 1;
  };

  const decreaseSize = () => {
    size -= 1;
  };

  const getNode = (node, howDeep) => {
    if (howDeep === 0) return node;
    if (node.next === null && howDeep >= 1) return false;
    const depth = howDeep - 1;
    return getNode(node.next, depth);
  };

  const at = index => {
    if (index >= 0) {
      const node = getNode(getHead(), index);
      if (node === false) return 'index too great';
      return node;
    }
    return 'index too small';
  };

  const checkValue = (value, node, ...indx) => {
    if (indx.length > 0) {
      const i = indx[0];
      if (node.value === value) return i;
      if (node.next === null) return false;
      return checkValue(value, node.next, i + 1);
    }
    if (node.value === value) return node;
    if (node.next === null) return false;
    return checkValue(value, node.next);
  };

  const contains = value => {
    const node = checkValue(value, getHead());
    if (node !== false) return true;
    return node;
  };

  const find = value => {
    const node = checkValue(value, getHead(), 0);
    return node;
  };

  const returnEveryValue = (node, string) => {
    if (node.next === null) {
      const newStr = `${string}( ${node.value} ) -> null`;
      return newStr;
    }
    const newStr = `${string}( ${node.value} ) -> `;
    return returnEveryValue(node.next, newStr);
  };

  const stringify = () => returnEveryValue(getHead(), '');

  const pop = () => {
    if (getHead().next === null) {
      getHead().value = null;
      decreaseSize();
    } else {
      const newLastNode = findSecondLastNull(getHead());
      newLastNode.next = null;
      decreaseSize();
    }
  };

  const getSize = () => size;

  const logList = node => {
    if (node.next !== null) {
      console.log(node.value);
      logList(node.next);
    } else {
      console.log(node.value);
    }
  };

  const logHead = () => {
    console.log(getHead());
  };

  const append = val => {
    if (getHead().value === null) {
      getHead().value = val;
      increaseSize();
    } else {
      const lastNode = findNull(getHead());
      lastNode.next = createNode(val);
      increaseSize();
    }
  };

  const prepend = val => {
    const newNode = createNode(val, getHead());
    head = newNode;
    increaseSize();
  };

  return {
    append,
    getHead,
    logList,
    logHead,
    prepend,
    increaseSize,
    decreaseSize,
    getSize,
    tail,
    at,
    pop,
    contains,
    find,
    stringify,
  };
}
