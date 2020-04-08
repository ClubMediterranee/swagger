const BODY_PATTERN = /<body[^>]*>((.|[\n\r])*)<\/body>/im

export function createElementFromFragment (data) {
  const result = BODY_PATTERN.exec(data)

  if (result && result[1]) {
    const fragment = document.createDocumentFragment()
    const div = document.createElement('div')
    div.innerHTML = result[1]

    fragment.appendChild(div)

    return fragment
  }
}
