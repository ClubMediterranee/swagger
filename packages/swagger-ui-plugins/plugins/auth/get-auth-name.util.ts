export function getOauthName(name: string) {
  if (name.indexOf("Bearer_") > -1) {
    return `OAuth ${name.split(" (")[0].replace("Bearer_", "").toUpperCase()}`;
  }

  return name;
}

export function getOauthId(name: string) {
  if (name.indexOf("Bearer_") > -1) {
    return name.split(" (")[0].replace("Bearer_", "").toLowerCase();
  }

  return name.toLowerCase();
}
