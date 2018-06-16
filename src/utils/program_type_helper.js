/**
 * 根据路由的 type 号获取其枚举中文值
 */
export function getProgramTypeEnum(type) {
  switch (type) {
    case '1':
      return '演唱会'
    case '2':
      return '音乐会'
    case '3':
      return '舞蹈芭蕾'
    case '4':
      return '话剧歌剧'
    case '5':
      return '曲艺杂谈'
    case '6':
      return '体育赛事'
    case '7':
      return '儿童亲子'
    case '8':
      return '展览休闲'
  }
}
