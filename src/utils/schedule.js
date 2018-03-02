export function getRelativeScheduleType(type) {
  switch (type) {
    case 'CONCERT':
      return '音乐会'
    case 'DANCE':
      return '舞蹈'
    case 'DRAMA':
      return '话剧'
    case 'SPORT':
      return '体育赛事'
  }
}
