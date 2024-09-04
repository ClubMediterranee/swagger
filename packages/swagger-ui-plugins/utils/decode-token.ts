export function decodeToken(value: string | undefined) {
  try {
    return value && JSON.parse(atob(value.split(".")[1]));
  } catch (er) {}
}
