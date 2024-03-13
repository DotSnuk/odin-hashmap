export default function createKeyNode(k = null, val = null, nxt = null) {
  const key = k;
  const value = val;
  const next = nxt;

  // const changeVal = newValue => {
  //   value = newValue;
  // };

  return { key, value, next };
}
