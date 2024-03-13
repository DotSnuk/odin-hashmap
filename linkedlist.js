import createKeyNode from './nodefactory.js';

export default function createList(storeObjectBool = false) {
  let head = createKeyNode();
  let size = 0;
  const storeObject = storeObjectBool;

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

  // const checker = (value, node) => {
  //   if (storeObject === true) {
  //     if (toString(Object.keys(node.value)) === toString(value)) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   if (node.value === value) {
  //     return true;
  //   }
  //   return false;
  // };

  // const checkValue = (value, node, ...indx) => {
  //   if (indx.length > 0) {
  //     const i = indx[0];
  //     if (checker(value, node)) return i;
  //     if (node.next === null) return false;
  //     return checkValue(value, node.next, i + 1);
  //   }
  //   // if (node.value === value) return node;
  //   // if (node.next === null) return false;
  //   if (checker(value, node)) return node;
  //   if (node.next === null) return false;
  //   return checkValue(value, node.next);
  // };

  const checkKey = (key, node, ...indx) => {
    if (indx.length > 0) {
      const i = indx[0];
      if (node.key === key) return i;
      if (node.next === null) return false;
      return checkKey(key, node.next, i + 1);
    }

    if (node.key === key) return node;
    if (node.next === null) return false;
    return checkKey(key, node.next);
  };

  const getNodeWithKey = key => {
    const node = checkKey(key, getHead());
    if (node !== false) return node;
    return false;
  };

  const contains = key => {
    if (getNodeWithKey(key) !== false) return true;
    return false;
  };

  const find = key => {
    const indx = checkKey(key, getHead(), 0);
    return indx;
  };

  const returnEveryValue = (node, string) => {
    if (node.next === null) {
      const newStr = `${string}( ${node.key}: ${node.value} ) -> null`;
      return newStr;
    }
    const newStr = `${string}( ${node.key}: ${node.value} ) -> `;
    return returnEveryValue(node.next, newStr);
  };

  const stringify = () => returnEveryValue(getHead(), '');

  const pop = () => {
    if (getHead().next === null) {
      getHead().key = null;
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

  const updateValue = (value, index) => {
    const node = at(index);
    node.value = value;
  };

  const append = (key, val) => {
    if (getHead().key === null) {
      getHead().key = key;
      getHead().value = val;
      increaseSize();
    } else {
      const lastNode = findNull(getHead());
      lastNode.next = createKeyNode(key, val);
      increaseSize();
    }
  };

  const prepend = (key, val) => {
    const newNode = createKeyNode(key, val, getHead());
    head = newNode;
    increaseSize();
  };

  return {
    append,
    prepend,
    getSize,
    at,
    updateValue,
    pop,
    contains,
    find,
    stringify,
    getNodeWithKey,
  };
}
