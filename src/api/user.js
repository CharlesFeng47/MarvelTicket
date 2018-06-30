import request from '@/utils/request'

const qs = require('qs')

/**
 * 收藏
 */
export function star(program_id, token) {
  return request({
    url: '/user/star',
    method: 'post',
    data: qs.stringify({
      program_id,
      token
    })
  })
}

/**
 * 取消收藏
 */
export function cancelStar(program_id, token) {
  return request({
    url: '/user/cancelStar',
    method: 'post',
    data: qs.stringify({
      program_id,
      token
    })
  })
}

/**
 * 获得该用户收藏的所有节目
 */
export function getStarPrograms(token) {
  return request({
    url: '/user/getStarPrograms',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}

/**
 * 修改密码
 */
export function modifyPassword(token, old_password, new_password) {
  return request({
    url: '/user/modifyPassword',
    method: 'post',
    data: qs.stringify({
      token,
      old_password,
      new_password
    })
  })
}

/**
 * 修改昵称
 */
export function modifyName(name, token) {
  return request({
    url: '/user/modifyName',
    method: 'post',
    data: qs.stringify({
      name,
      token
    })
  })
}

/**
 * 修改头像
 */
export function modifyPortrait(portrait, token) {
  return request({
    url: '/user/modifyPortrait',
    method: 'post',
    data: qs.stringify({
      portrait,
      token
    })
  })
}

// /**
//  * 用户兑换优惠券
//  */
// export function couponConvert(token, description, offPrice, neededCredit) {
//   return request({
//     url: '/user/coupon_convert',
//     method: 'post',
//     data: qs.stringify({
//       token,
//       description,
//       offPrice,
//       neededCredit
//     })
//   })
// }

// /**
//  * 会员注销
//  */
// export function memberInvalidate(token) {
//   return request({
//     url: '/user/member_invalidate',
//     method: 'post',
//     data: qs.stringify({
//       token
//     })
//   })
// }

/**
 * 会员激活
 */
export function memberActivate(active_url) {
  return request({
    url: '/user/userActive',
    method: 'post',
    data: qs.stringify({
      active_url
    })
  })
}
