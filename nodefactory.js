export default function createNode(val = null, nxt = null) {
  const value = val;
  const next = nxt;

  return { value, next };
}
