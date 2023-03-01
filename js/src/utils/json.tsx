export const getCopyableJson = (variable: any) => {
  const jsonStringStrippedEscapeC = JSON.stringify(
    JSON.stringify(variable || '{}'),
  ).replace(/\\/g, '')
  const jsonString = jsonStringStrippedEscapeC.slice(
    1,
    jsonStringStrippedEscapeC.length - 1,
  )

  if (typeof variable === 'object') {
    const countKeys = Object.keys(variable).length

    return countKeys === 0 ? '' : jsonString
  }
  return !!variable ? jsonString : ''
}
