import React, { Fragment } from 'react'
import SessionNavigation from './SessionNavigation'
import SessionWeek from './SessionWeek'
import SessionMonth from './SessionMonth'
import SessionHour from './SessionHour'
import SessionTimezone from './SessionTimezone'
import { getCoachInfo } from '../../api'
import { getDateFromData, getDateFarFromDate, getAvailableDates, isAvailableDate } from '../../utils'

export default class SessionDate extends React.Component {
  componentDidMount() {
    let promise = getCoachInfo()
    promise
      .then((coach) => {
        let availableBlocks = coach.calendar.availableBlocks
        let sessionsTime = []
        availableBlocks.map((block) => {
          sessionsTime.push(block.timeBegin + ' ' + block.id)
          return null
        })
        let availableTimes = sessionsTime.map(time => getDateFromData(time))
        let availableLocalTimeBlocks = availableTimes.map(time => getDateFarFromDate(time.year, time.month, time.date, time.hour, time.minute, 0, this.props.timezoneOffset, time.blockId))
        this.props.updateSessions({
          availableBlocks: availableBlocks,
          availableLocalTimeBlocks: availableLocalTimeBlocks
        })
      })
  }

  handleClickOverlay() {
    let sessions = this.props
    this.props.updateSessions({
      showMonthPopup: false,
      showTzSelection: false,
      popupYear: sessions.viewYear,
      popupMonth: sessions.viewMonth
    })
  }

  render() {
    let session = this.props
    let noAvailableDate = true
    let firstAvailableDate = {}
    let specificAvailables = getAvailableDates(session.availableLocalTimeBlocks)
    let viewTimeObj = new Date(session.viewYear, session.viewMonth, session.viewDate)

    let viewDayIndex = viewTimeObj.getDay() !== 0 ? viewTimeObj.getDay(): 7
    let viewDayTime = viewTimeObj.getTime()

    let days = []
    for (let i = 1; i <= viewDayIndex; i++) {
      let dayTime = viewDayTime - (viewDayIndex - i)*24*60*60*1000
      let dayTimeObject = new Date(dayTime)
      days.push(dayTimeObject.getDate())
    }
    for (let i = viewDayIndex+1; i <= 7; i++) {
      let dayTime = viewDayTime - (viewDayIndex - i)*24*60*60*1000
      let dayTimeObject = new Date(dayTime)
      days.push(dayTimeObject.getDate())
    }

    days.map((day, index) => {
      let month = getDateFarFromDate(session.viewYear, session.viewMonth, session.viewDate, 0, 0, index-viewDayIndex, 0).month
      if (isAvailableDate(specificAvailables, session.viewYear, month, day) && noAvailableDate) {
        noAvailableDate = false
        firstAvailableDate.year = session.viewYear
        firstAvailableDate.month = month
        firstAvailableDate.date = day
      }
      return null
    })

    return (
      <div className="calendar date">
        <SessionNavigation prevStep="list" title="Select date" {...this.props} />
        <div className="session-info">
          {session.selectedTemplate.name &&
            <p className="session-name">{session.selectedTemplate.name + ', ' + session.selectedTemplate.duration + ' minutes'}</p>
          }
        </div>
        <SessionWeek
          {...this.props}
          specificAvailables = {specificAvailables} 
          firstAvailableDate = {firstAvailableDate}
          weekDates = {days} 
        />
        <SessionMonth 
          specificAvailables = {specificAvailables}
          firstAvailableDate = {firstAvailableDate}
          {...this.props} 
        />

        {noAvailableDate &&
          <p className="no-vailable">No available day for this week</p>
        }

        {!noAvailableDate &&
          <Fragment>
            <SessionTimezone {...this.props} />
            <SessionHour 
              {...this.props} 
              noAvailableDate = {noAvailableDate}
              firstAvailableDate = {firstAvailableDate}
              weekDates = {days} 
            />
          </Fragment>  
        }
        
        <div 
          className={this.props.showMonthPopup || this.props.showTzSelection ? "overlay show" : "overlay"}
          onClick={this.handleClickOverlay.bind(this)}
          >
        </div>
      </div>
    )
  }
}
