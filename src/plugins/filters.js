/**
 * [getDateDiff description]
 * [过滤时间为 例：1天前]
 * @return  {[type]}  [return description]
 */
export function getDateDiff(dateTimeStamp) {
  if (!dateTimeStamp) {
    return ''
  }
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let month = day * 30
  let now = new Date().getTime()
  let diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return
  }
  let monthC = diffValue / month
  let weekC = diffValue / (7 * day)
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minute
  let result = ''
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

/**
 * [formatDate description]
 * [时间过滤为 年-月-日 时-分-秒]
 * @return  {[type]}  [return description]
 */
export function formatDate(now) {
  if (!now) {
    return ''
  }
  now = new Date(parseInt(now))
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var dates = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (dates < 10) {
    dates = '0' + dates
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  return `${year}-${month}-${dates} ${hour}:${minute}:${second}`
}

/**
 * [formatDate2 description]
 * [时间过滤为 年-月-日]
 * @return  {[type]}  [return description]
 */
export function formatDate2(now) {
  if (!now) {
    return ''
  }
  now = new Date(parseInt(now))
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var dates = now.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (dates < 10) {
    dates = '0' + dates
  }
  return `${year}-${month}-${dates}`
}

/**
 * [formatSeconds description]
 * [过滤时间为 时:分:秒]
 * @return  {[type]}  [return description]
 */
export function formatDuraton(time) {
  // time = time.toFixed()
  if (time > -1) {
    var hour = Math.floor(time / 3600);
    var min = Math.floor(time / 60) % 60;
    var sec = time % 60;
    if (hour < 10) {
      time = '0' + hour + ":";
    } else {
      time = hour + ":";
    }

    if (min < 10) {
      time += "0";
    }
    time += min + ":";

    if (sec < 10) {
      time += "0";
    }
    time += sec;
  }
  return time;
}

/**
 * [formatSeconds description]
 * [过滤时间为 时分秒]
 * @return  {[type]}  [return description]
 */
export function formatDuraton2(time) {
  // time = time.toFixed()
  if (time > -1) {
    var hour = Math.floor(time / 3600);
    var min = Math.floor(time / 60) % 60;
    var sec = time % 60;
    if (hour < 1) {
      hour = ''
    } else {
      hour = `${hour}小时`
    }

    if (min < 1 && hour < 1) {
      min = ''
    } else {
      min = `${min}分钟`
    }

    sec = `${sec}秒`
  }
  return `${hour}${min}${sec}`
}

/**
 * [filterColor description]
 * [根据专辑类型过滤对应颜色]
 * @return  {[type]}  [return description]
 */
export function productTypeColor ({type}) {
  if (type === '2') {
    return '#121212'
  } else if (type === '3') {
    return '#4a90e2'
  } else if (type === '4') {
    return '#ff6c3a'
  } else if (type === '5') {
    return '#6dd400'
  } else if (type === '6') {
    return '#121212'
  }
}

/**
 * [productTypeFilter description]
 * [专辑类型过滤]
 * @return  {[type]}  [return description]
 */
export function productTypeFilter (type) {
  if (type === '1') {
    return '纸质书'
  } else if (type === '2') {
    return '有声书'
  } else if (type === '3') {
    return '讲书'
  } else if (type === '4') {
    return '精读'
  } else if (type === '5') {
    return '课程'
  } else if (type === '6') {
    return '电子书'
  }
}

