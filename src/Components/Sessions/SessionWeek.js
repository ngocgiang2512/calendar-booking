import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import { getDateFarFromDate, getViewDate, isToday, getAvailableDates, isAvailableDate, hasAvailableBefore, hasAvailableAfter, classnames } from '../../utils'

export default class SessionWeek extends React.Component {
  handleClickToday() {
    let now = new Date()
    this.props.updateSessions({
      viewYear: now.getFullYear(),
      viewMonth: now.getMonth(),
      viewDate: now.getDate(),
      popupYear: now.getFullYear(),
      popupMonth: now.getMonth(),
    })
  }

  handleClickPrevWeek() {
    let session = this.props
    let newViewDate = getDateFarFromDate(session.viewYear, session.viewMonth, session.viewDate, 0, 0, -7, 0).date
    this.props.updateSessions({viewDate: newViewDate})
    if (newViewDate > session.viewDate) {
      this.props.updateSessions({
        viewMonth: session.viewMonth - 1,
        popupMonth: session.viewMonth - 1
      })
      if (session.viewMonth === 0) {
        this.props.updateSessions({
          viewYear: session.viewYear - 1,
          viewMonth: 11,
          popupYear: session.viewYear - 1,
          popupMonth: 11,
        })
      }
    }
  }

  handleClickNextWeek() {
    let session = this.props
    let newViewDate = getDateFarFromDate(session.viewYear, session.viewMonth, session.viewDate, 0, 0, 7, 0).date
    this.props.updateSessions({viewDate: newViewDate})
    if (newViewDate < session.viewDate) {
      this.props.updateSessions({
        viewMonth: session.viewMonth + 1,
        popupMonth: session.viewMonth + 1
      })
      if (session.viewMonth === 11) {
        this.props.updateSessions({
          viewYear: session.viewYear + 1,
          viewMonth: 0,
          popupYear: session.viewYear + 1,
          popupMonth: 0,
        })
      }
    }
  }

  selectDate(date, dayDistance) {
    let session = this.props
    let month = getDateFarFromDate(session.viewYear, session.viewMonth, session.viewDate, 0, 0, dayDistance, 0).month
    this.props.updateSessions({
      selectedYear: this.props.viewYear,
      selectedMonth: month,
      selectedDate: date
    })
  }

  showMonthPopup() {
    this.props.updateSessions({showMonthPopup: true})
  }

  getElementClassName(date, dayDistance) {
    let session = this.props
    let availableDates = getAvailableDates(session.availableLocalTimeBlocks)
    let month = getDateFarFromDate(session.viewYear, session.viewMonth, session.viewDate, 0, 0, dayDistance, 0).month
    let targetMonth = session.firstAvailableDate.month
    let targetDate = session.firstAvailableDate.date
    if (session.selectedYear !== null
        && session.selectedMonth === session.viewMonth
    ) {
      targetMonth = session.selectedMonth
      targetDate = session.selectedDate
    }
    
    return classnames(
      "col",
      {today: isToday(session.viewYear, month, date)},
      {disable: !isAvailableDate(availableDates, session.viewYear, month, date)},
      {selected: month === targetMonth && date === targetDate}
    )
  }

  render() {
    let session = this.props
    let weekDates = session.weekDates
    let cal_days_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    let viewTimeObj = new Date(session.viewYear, session.viewMonth, session.viewDate)
    let viewDayIndex = viewTimeObj.getDay() !== 0 ? viewTimeObj.getDay(): 7

    return (
      <div className="day-selection clearfix">
        <header className="day-selection-header clearfix">
          <span className="today" onClick={this.handleClickToday.bind(this)}>Today</span>
          <IconButton 
            className={hasAvailableBefore(session.specificAvailables, session.viewYear, session.viewMonth, weekDates[0]) ? "iconButton" : "iconButton disable"} 
            onClick={this.handleClickPrevWeek.bind(this)}>
            <FontIcon className="material-icons">
              keyboard_arrow_left
            </FontIcon>
          </IconButton>
          <IconButton
            className={hasAvailableAfter(session.specificAvailables, session.viewYear, session.viewMonth, weekDates[6]) ? "iconButton" : "iconButton disable"} 
            onClick={this.handleClickNextWeek.bind(this)}>
            <FontIcon className="material-icons">
              keyboard_arrow_right
            </FontIcon>
          </IconButton>
          <p className="date-label" onClick={this.showMonthPopup.bind(this)}>
            <span className="month">{getViewDate(session.viewYear, session.viewMonth, session.viewDate)}</span>
            <FontIcon className="material-icons">
              arrow_drop_down
            </FontIcon>
          </p>
        </header>
        <div className="row day-option">
          {weekDates.map((day, index) => (
            <div key={index} className={this.getElementClassName(day, index-viewDayIndex+1)} >
              <div className="cell" onClick={this.selectDate.bind(this, day, index-viewDayIndex)}>
                <span>{cal_days_labels[index]}</span>
                <p>{day}</p>
              </div>
              <p className="bottom-text">unavailable</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
