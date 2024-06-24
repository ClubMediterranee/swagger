export function decodeToken(value: string) {
  try {
    return JSON.parse(atob(value.split(".")[1]));
  } catch (er) {}
}
