export const sortAlphabet = (data) => {
  return Array.from({ length: 26 }, (val, index) =>
    String.fromCharCode(65 + index)
  ).reduce((pre, cur) => {
    if (data[cur]) {
      pre[cur] = data[cur]
    }
    return pre
  }, {})
}
