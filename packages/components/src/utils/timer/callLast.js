export function callLast (fn, time) {
  let last = null

  return (...args) => {
    if (last) {
      clearTimeout(last)
      last = null
    }

    last = setTimeout(() => fn(...args), time)
  }
}
