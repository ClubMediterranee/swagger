const BODY_PATTERN = /<body[^>]*>((.|[\n\r])*)<\/body>/im

export function createElementFromFragment (data) {
  const result = BODY_PATTERN.exec(data)

  if (result && result[1]) {
    const div = document.createElement('div')

    div.innerHTML = result[1]
      .replace(/src="(.*)"/gi, '')
      .replace(/href="(.*)"/gi, '')

    return div
  }
}
