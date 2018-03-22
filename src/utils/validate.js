/**
 * Created by jiachenpan on 16/11/18.
 */

export function isValidUsername(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 数字 */
export function isValidatNumbers(str) {
  const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
  return reg.test(str)
}

/* 正整数 */
export function isValidatePositiveIntegers(str) {
  const reg = /^[1-9]\d*$/
  return reg.test(str)
}

/* 邮箱 */
export function isValidateEmail(str) {
  // [\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(str)
}

/* 8位订单号 */
export function isValidateOrderId(str) {
  const reg = /^[0-9]{8}$/
  return reg.test(str)
}

