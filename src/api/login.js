import request from '@/utils/request'

const qs = require('qs')

/**
 * 登录
 */
export function login(username, password, userType) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify({
      username,
      password,
      userType
    })
  })
}

/**
 * 会员注册
 */
export function memberSignUp(username, password, email) {
  return request({
    url: '/login/member_sign_up',
    method: 'post',
    data: qs.stringify({
      username,
      password,
      email
    })
  })
}

/**
 * 场馆注册
 */
export function spotSignUp(spot_basic, spot_seats_map, cur_seat_type_count, seat_names) {
  const seatInfos = convertToSeatInfos(cur_seat_type_count, spot_seats_map, seat_names)
  console.log(seatInfos)

  return request({
    url: '/login/spot_sign_up',
    method: 'post',
    data: qs.stringify({
      password: spot_basic.password,
      name: spot_basic.name,
      site: spot_basic.site,
      seatInfos: JSON.stringify(seatInfos),
      seatsMap: JSON.stringify(spot_seats_map)
    })
  })
}

/**
 * 通过token定时获取指定用户信息
 */
export function getInfo(token) {
  return request({
    url: '/login/info',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}

/**
 * 登出
 */
export function logout(token) {
  return request({
    url: '/login/logout',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}

/**
 * 将前端数据转换后再传给后端
 */
function convertToSeatInfos(cur_seat_type_count, spot_seats_map, seat_names) {
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
function countSpecificChar(spot_seats_map, char) {
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
