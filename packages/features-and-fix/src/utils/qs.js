export const qs = {
  stringify (obj) {
    if (obj) {
      return Object.entries(obj).map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((value) => `${key}=${encodeURIComponent(value)}`).join('&')
        }

        return `${key}=${encodeURIComponent(value)}`
      }, []).join('&')
    }
    return ''
  }
}
