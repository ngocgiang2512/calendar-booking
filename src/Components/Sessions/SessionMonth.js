import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import { isToday, getAvailableDates, isAvailableDate, hasAvailableBefore, hasAvailableAfter, classnames } from '../../utils'

export default class SessionMonth extends React.Component {
  handleClickPrevMonth() {
    let popupMonth = this.props.popupMonth
    let popupYear = this.props.popupYear
    if (popupMonth === 0) {
      this.props.updateSessions({
        popupMonth: 11,
        popupYear: popupYear - 1
      })
    } else {
      this.props.updateSessions({
        popupMonth: popupMonth - 1
      })
    }
  }

  handleClickNextMonth() {
    let popupMonth = this.props.popupMonth
    let popupYear = this.props.popupYear
    if (popupMonth === 11) {
      this.props.updateSessions({
        popupMonth: 0,
        popupYear: popupYear + 1
      })
    } else {
      this.props.updateSessions({
        popupMonth: popupMonth + 1
      })
    }
  }

  selectWeek(date) {
    this.props.updateSessions({
      showMonthPopup: false,
      viewYear: this.props.popupYear,
      viewMonth: this.props.popupMonth,
      viewDate: date,
      selectedYear: this.props.popupYear,
      selectedMonth: this.props.popupMonth,
      selectedDate: date
    })
  }

  hideMonthPopup() {
    this.props.updateSessions({
      showMonthPopup: false
    })
  }

  getElementClassName(date) {
    let session = this.props
    let availableDates = getAvailableDates(session.availableLocalTimeBlocks)
    let targetMonth = session.firstAvailableDate.month
    let targetDate = session.firstAvailableDate.date

    if (session.selectedYear !== null
        && session.selectedMonth === session.popupMonth
    ) {
      targetMonth = session.selectedMonth
      targetDate = session.selectedDate
    }
   
    return classnames(
      {today: isToday(session.popupYear, session.popupMonth, date)},
      {disable: !isAvailableDate(availableDates, session.popupYear, session.popupMonth, date)},
      {selected: session.popupMonth === targetMonth && date === targetDate}
    )
  }

  render() {
    let session = this.props

    let popupYear = this.props.popupYear
    let popupMonth = this.props.popupMonth

    let cal_days_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let cal_months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // these are the days of the week for each month, in order
    let cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let monthLength = cal_days_in_month[popupMonth];

    // compensate for leap year
    if (popupMonth === 1) { // February only!
      if((popupYear % 4 === 0 && popupYear % 100 !== 0) || popupYear % 400 === 0){
        monthLength = 29;
      }
    }

    let popupDate = new Date(popupYear, popupMonth, 1)
    let days_array = []

    let first_day_of_month = popupDate.getDay() !== 0 ? popupDate.getDay() : 7
    let empty_days_before_first_day = first_day_of_month - 1
    for (let i = 0; i < monthLength + empty_days_before_first_day; i++) {
      if (i < empty_days_before_first_day) {
        days_array.push('');
      } else {
        days_array.push(i + 1 - empty_days_before_first_day)
      }
    }

    return (
      <div className={classnames("month-popup", {show: session.showMonthPopup})}>
        <header className="month-popup-header clearfix">
          <span className="month-label">{cal_months_labels[session.popupMonth] + ' ' + session.popupYear}</span>
          <IconButton 
            className={hasAvailableAfter(session.specificAvailables, session.popupYear, session.popupMonth, days_array[days_array.length-1]) ? "iconButton" : "iconButton disable"} 
            onClick={this.handleClickNextMonth.bind(this)}>
            <FontIcon className="material-icons">
              keyboard_arrow_right
            </FontIcon>
          </IconButton>
          <IconButton 
            className={hasAvailableBefore(session.specificAvailables, session.popupYear, session.popupMonth, 1) ? "iconButton" : "iconButton disable"}  
            onClick={this.handleClickPrevMonth.bind(this)}>
            <FontIcon className="material-icons">
              keyboard_arrow_left
            </FontIcon>
          </IconButton>
        </header>
        <div className="row day-label">
          {cal_days_labels.map((day, index) => (
            <p key={index}>{cal_days_labels[index]}</p>
          ))}
        </div>
        <div className="row day-value">
          {days_array.map((day, index) => (
            <p key={index} className={this.getElementClassName(days_array[index])} onClick={this.selectWeek.bind(this, days_array[index])}>
              {day !== '' && <span>{day}</span>}
            </p>
          ))}
        </div>
      </div>
    )
  }
}
