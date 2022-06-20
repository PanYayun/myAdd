/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
/**
 * @description 获取几天前的时间可传入两个参数
 */
export const fun_date = (num1, num2) => {
  let nowdate = new Date()
  let before = new Date(nowdate - 1000 * 60 * 60 * 24 * num1)
  let after = new Date(nowdate - 1000 * 60 * 60 * 24 * num2)
  // 第一个参数的时间
  let beforyear = before.getFullYear()
  let beformonth = before.getMonth() + 1
  let beforday = before.getDate()
  let beforeDate = beforyear + '-' + (beformonth < 10 ? '0' + beformonth : beformonth) + '-' + (beforday < 10 ? '0' + beforday : beforday)
  // 第二个参数的时间
  let afteryear = after.getFullYear()
  let aftermonth = after.getMonth() + 1
  let afterday = after.getDate()
  let afterDate = afteryear + '-' + (aftermonth < 10 ? '0' + aftermonth : aftermonth) + '-' + (afterday < 10 ? '0' + afterday : afterday)
  return [beforeDate, afterDate]
}
/**
 * @description 获取3个月前的时间可传入1个参数
 */
export const fun_date_start_3 = (num1) => {
  var dateArr = num1.split('-');
  var year = dateArr[0]; //获取当前日期的年份
  var month = dateArr[1]; //获取当前日期的月份
  var day = dateArr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - 3;
  if (month2 <= 0) {
      var absM = Math.abs(month2);
      year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
      month2 = 12 - (absM % 12);
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
      day2 = days2;
  }
  if (month2 < 10) {
      month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}
// 时间戳转时间字符 标准时间转时间字符
export const time_format = (date, type) => {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  if (type && type.length > 0) {
    if (type === "yy.MM.dd hh:mm") {
      return y + '.' + m + '.' + d + ' ' + h + ':' + minute;
    }else if (type === "yy.MM.dd") {
      return y + '.' + m + '.' + d;
    }else if (type === "yy-MM-dd") {
      return y + '-' + m + '-' + d;
    } else {
       return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second; 
      }
  } else {
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  }

}
