export function decodeToken (value) {
  try {
    return JSON.parse(atob(value.split('.')[1]))
  } catch (er) {
  }
}
