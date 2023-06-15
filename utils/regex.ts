const alphaNumeric = /\W|_/
const email =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const phone = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)(\d)/g, '($1) $2 $3')
    .replace(/(\d)(\d{4})$/, '$1 $2')

const validation = {
  alphaNumeric,
  email,
  phone
}

export default validation
