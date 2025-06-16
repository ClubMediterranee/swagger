export function getOauthName(name: string) {
  if (name === "bearer_jwt") {
    return "Bearer JWT";
  }

  if (name.toLowerCase().indexOf("bearer_") > -1) {
    return `OAuth ${name.split(" (")[0].replace("bearer_", "").toUpperCase()}`;
  }

  return name;
}

export function getOauthId(name: string) {
  if (name.toLowerCase().indexOf("bearer_") > -1) {
    return name.split(" (")[0].replace("bearer_", "").toLowerCase();
  }

  return name.toLowerCase();
}
