/**
 * @param cur_seat_type_count 当前含有的座位种数
 * @param spot_seats_map 座位图
 * @param seat_names 座位名称数组
 * @return {Array} 前端展示的座位数组
 */
export function computeSeatNameNumMap(cur_seat_type_count, spot_seats_map, seat_names) {
  const seatRepreChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

  var result = []
  var i = 0
  for (var temp in seat_names) {
    result[i] = {}
    result[i].seatName = seat_names[temp]
    result[i].num = countSpecificChar(spot_seats_map, seatRepreChar[i])
    i++
    if (i >= cur_seat_type_count) break
  }
  return result
}

/**
 * 在 seat_map 中查找指定的 char 的个数
 * 与 /src/view/user/spot/index.vue:128~139 冗余
 */
export function countSpecificChar(spot_seats_map, char) {
  var count = 0

  const rowNum = spot_seats_map.length
  const colNum = spot_seats_map[0].length
  for (var i = 0; i < rowNum; i++) {
    for (var j = 0; j < colNum; j++) {
      if (spot_seats_map[i].charAt(j) === char) count++
    }
  }
  console.log('char: ' + char + ' count: ' + count)
  return count
}
