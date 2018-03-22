/**
 * 订单id转为8位标准展示
 * @return id的8位string展示
 */
export function makeUpOrderId(id) {
  var temp = id + ''
  while (temp.length < 8) {
    temp = '0' + temp
  }
  return temp
}
