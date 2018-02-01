export function classnames() {
  let classNames = ''
  for (let i = 0; i < arguments.length; i ++) {
    let className = ''
    if (arguments[i] && typeof arguments[i] === 'object') {
      let argObj = arguments[i]
      if (argObj[Object.keys(argObj)[0]]) {
        className = Object.keys(argObj)[0]
      } 
    } else if (arguments[i]) {
      className = arguments[i]
    }
    classNames += classNames !== '' && className ? ' ' + className : className
  }
  return classNames
}

// these are labels for the days of the week
// let cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let cal_full_days_labels = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

// these are human-readable month name labels, in order
let cal_months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let cal_months_labels_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getFullDate(year, month, date) {
  let selected_date_obj = new Date(year, month, date)
  let selected_day = selected_date_obj.getDay()

  let fullDate = ''
  fullDate += cal_full_days_labels[selected_day] 
  fullDate += ', ' + date + '/' + (month + 1)
  fullDate += '/' + year

  return fullDate
}

export function getViewDate(year, month, date) {
  let view_date = ''
  let view_month = ''

  let viewTimeObj = new Date(year, month, date)
  let day = viewTimeObj.getDay() !== 0 ? viewTimeObj.getDay(): 7

  let month_of_week_start = getDateFarFromDate(year, month, date, 0, 0, 1 - day, 0).month
  let month_of_week_end = getDateFarFromDate(year, month, date, 0, 0, 7 - day, 0).month

  if (month_of_week_start === month_of_week_end) {
    view_month += cal_months_labels[month]
  } else {
    view_month += cal_months_labels_short[month_of_week_start]
    view_month += ' - ' + cal_months_labels_short[month_of_week_end]
  }
  
  view_date += view_month + ' ' + year
  return view_date
}

export function isToday(year, month, date) {
  let now = new Date()
  return year === now.getFullYear() && month === now.getMonth() && date === now.getDate()
}

export function getAvailableDates(times) {
  if (!times) return
  let sampleDate = {}
  let availableDates = times.map(time => {
    return {
      year: time.year,
      month: time.month,
      date: time.date
    }
  })

  availableDates = availableDates.filter((date, index, dates) => {
    if (JSON.stringify(dates[index]) !== JSON.stringify(sampleDate)) {
      sampleDate.year = dates[index].year
      sampleDate.month = dates[index].month
      sampleDate.date = dates[index].date
      return true
    } else {
      return false
    }
  })
  
  return availableDates
}

export function isAvailableDate(availableDates, year, month, date) {
  return availableDates.some(availableDate => 
    availableDate.year === year && availableDate.month === month && availableDate.date === date
  )
}

export function getDateFromData(data) {
  let dateArray = data.split(' ')[0].split('-')
  let hourArray = data.split(' ')[1].split(':')
  let blockId = data.split(' ')[2]
 
  return {
    year: parseInt(dateArray[0], 10),
    month: parseInt(dateArray[1], 10) - 1,
    date: parseInt(dateArray[2], 10),
    hour: parseInt(hourArray[0], 10),
    minute: parseInt(hourArray[1], 10),
    blockId: blockId
  }
}

export function getDateFromTimeStamp(timeStamp) {
  let dateObj = new Date(timeStamp)

  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth(),
    date: dateObj.getDate(),
    hour: dateObj.getHours(),
    minute: dateObj.getMinutes()
  }
}

export function getDateFarFromDate(year, month, date, hour, minute, dayDistance, hourDistance, blockId) {
  let fromDateObj = new Date(year, month, date, hour, minute)
  let fromDateTimeStamp = fromDateObj.getTime()
  let targetDateTimeStamp = fromDateTimeStamp + dayDistance*24*60*60*1000 + hourDistance*60*60*1000
  let targetDateObj = new Date(targetDateTimeStamp)

  return {
    year: targetDateObj.getFullYear(),
    month: targetDateObj.getMonth(),
    date: targetDateObj.getDate(),
    hour: targetDateObj.getHours(),
    minute: targetDateObj.getMinutes(),
    blockId: blockId
  }
}

export function getTimeFormated(hour, minute, format24) {
  let dayPart = ''
  minute = minute < 10 ? '0' + minute : minute
  if (!format24) {
    dayPart = hour > 11 ? 'pm' : 'am'
    hour = hour > 11 ? hour - 12 : hour
  } 
  hour = hour < 10 ? '0' + hour : hour
  return hour + ':' + minute + ' ' + dayPart
}

export function getTimeZoneInfo(tzOffset, tzName) {
  tzOffset = tzOffset <= 0 ? tzOffset : "+" + tzOffset
  tzName = tzName.replace(/_/g, " ")
  return "(GMT: " + tzOffset + ":00) " + tzName
}

// check if has available day before viewing day
export function hasAvailableBefore(specificAvailables, yearTarget, monthTarget, dateTarget) {
  return specificAvailables.some(time =>
    (time.year < yearTarget)
      || (time.year === yearTarget && time.month < monthTarget)
      || (time.year === yearTarget && time.month === monthTarget && time.date < dateTarget)
  )
}

// check if has available day before viewing day
export function hasAvailableAfter(specificAvailables, yearTarget, monthTarget, dateTarget) {
  return specificAvailables.some(time =>
    (time.year > yearTarget)
      || (time.year === yearTarget && time.month > monthTarget)
      || (time.year === yearTarget && time.month === monthTarget && time.date > dateTarget)
  )
}
