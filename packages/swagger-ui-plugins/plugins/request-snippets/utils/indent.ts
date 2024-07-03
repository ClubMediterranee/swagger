export function indent(str: string, char = "    ") {
  return str
    .split("\n")
    .map((line) => {
      return char + line;
    })
    .join("\n")
    .trim();
}
