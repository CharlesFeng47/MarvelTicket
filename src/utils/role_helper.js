/**
 * 将角色信息转为中文
 * @param role
 */
export function convertRoleToChinese(role) {
  switch (role) {
    case 'MEMBER':
      return '会员'
    case 'SPOT':
      return '场馆'
    case 'MANAGER':
      return '管理员'
  }
}
