/**
 * 获取系统中所有的节目类型
 */
export  function getAllTypes() {
  return ['演唱会', '音乐会', '舞蹈芭蕾', '话剧歌剧', '曲艺杂谈', '体育赛事', '儿童亲子', '展览休闲']
}

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

/**
 * 根据路由的枚举中文值获取其 type 号
 */
export function getProgramTypeIdByEnum(typeEnum) {
  switch (typeEnum) {
    case '演唱会':
      return '1'
    case '音乐会':
      return '2'
    case '舞蹈芭蕾':
      return '3'
    case '话剧歌剧':
      return '4'
    case '曲艺杂谈':
      return '5'
    case '体育赛事':
      return '6'
    case '儿童亲子':
      return '7'
    case '展览休闲':
      return '8'
  }
}

/**
 * 根据筛选条件筛选
 */
export function toPick(pickCriteria, programBriefsOrigin) {
  if (pickCriteria === '全部时间') return programBriefsOrigin

  const today = new Date()
  // 筛选的截止日期，不包含此日
  var targetDate = new Date()

  // today.setMonth(9)
  // today.setDate(25)
  // targetDate.setMonth(9)
  // targetDate.setDate(25)

  switch (pickCriteria) {
    case '本周末':
      targetDate = getFirstWeekday(today, targetDate)
      break
    case '一周内':
      targetDate.setDate(today.getDate() + 7)
      break
    case '一月内':
      targetDate.setDate(today.getDate() + 30)
  }

  var filteredProgramBriefs = []
  for (var i = 0; i < programBriefsOrigin.length; i++) {
    /**
     * @Warning 因为后端返回的数据都是在未开始的，所以此处就不检验了
     */
    const curDate = new Date(Date.parse(programBriefsOrigin[i].time))
    if (curDate < targetDate) filteredProgramBriefs.push(programBriefsOrigin[i])
  }
  return filteredProgramBriefs
}

/**
 * 获取周末过后的第一个工作日
 */
function getFirstWeekday(today, targetDate) {
  let hasWeekend = isWeekend(today)

  while (!(hasWeekend && !isWeekend(targetDate))) {
    targetDate.setDate(targetDate.getDate() + 1)

    if (isWeekend(targetDate)) hasWeekend = true
  }
  return targetDate
}

/**
 * 判断是否为周末
 */
function isWeekend(date) {
  return date.getDay() === 6 || date.getDay() === 0
}

/**
 * 根据排序条件排序
 */
export function toSort(sortCriteria, filteredProgramBriefs) {
  switch (sortCriteria) {
    case '按热度降序':
      return filteredProgramBriefs.sort(objectSort('favoriteNum', true))
    case '按开演时间升序':
      return filteredProgramBriefs.sort(objectSort('time', false))
    case '按开演时间降序':
      return filteredProgramBriefs.sort(objectSort('time', true))
  }
}

/**
 * 对对象按照属性排序，可指定升序降序
 */
function objectSort(property, desc) {
  if (desc) {
    return function (a, b) {
      return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
    }
  } else {
    return function (a, b) {
      return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
  }
}

