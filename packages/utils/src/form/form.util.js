// @flow
export function getFormattedLabel (placeholder: string = '', isRequired: boolean = false): string {
  if (!placeholder) return ''
  return isRequired ? `${placeholder}*` : placeholder
}

export function getCursorClass ({ isDisabled, isLoading, isReadOnly, hasPointer }: {
  isDisabled: boolean,
  isLoading: boolean,
  isReadOnly: Boolean,
  hasPointer: boolean,
}): string {
  if (isDisabled) return 'cursor-not-allowed'
  if (isReadOnly) return 'cursor-default'
  if (isLoading) return 'cursor-wait'
  return hasPointer ? 'cursor-pointer' : ''
}
