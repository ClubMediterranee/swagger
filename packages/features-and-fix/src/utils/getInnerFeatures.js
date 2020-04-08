export function getInnerFeatures (elem = document) {
  return JSON.parse(document.querySelector('#features-data').textContent)
}
