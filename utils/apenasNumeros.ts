export default function apenasNumeros(string: string) {
  const numsStr = string.replace(/[^0-9]/g, '')
  return parseInt(numsStr)
}
