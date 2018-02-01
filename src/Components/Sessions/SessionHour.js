import React, { Fragment } from 'react'
import { getTimeFormated, classnames } from '../../utils'

export default class SessionHour extends React.Component {
  selectHour(hour, minute, blockId) {
    let session = this.props
    if (session.selectedDate === null) {
      this.props.updateSessions({
        selectedYear: session.viewYear,
        selectedMonth: session.firstAvailableDate.month,
        selectedDate: session.firstAvailableDate.date
      })
    }
    this.props.updateSessions({
      selectedHour: hour, 
      selectedMinute: minute, 
      selectedBlock: blockId, 
      step: 'confirm'
    })
  }

  switchHourFormat() {
    let hourFormat = this.props.format24
    this.props.updateSessions({format24: !hourFormat})
  }

  render() {
    let session = this.props
    let sessionTimes = session.availableLocalTimeBlocks
    let format24 = session.format24
    let firstNoon = true
    let weekDates = session.weekDates

    let targetYear = session.firstAvailableDate.year
    let targetMonth = session.firstAvailableDate.month
    let targetDate = session.firstAvailableDate.date
    if (session.selectedYear !== null
        && session.selectedMonth === session.viewMonth
        && weekDates.indexOf(session.selectedDate) !== -1
    ) {
      targetYear = session.selectedYear 
      targetMonth = session.selectedMonth
      targetDate = session.selectedDate
    }
    
    return (
      <div className="cal-booking-hour clearfix">
        <div className={classnames("timeFormatToggle", {twh: session.format24})}>
          <span className="part">am/pm</span>
          <label className="switch">
            <input 
              type="checkbox" 
              defaultChecked={session.format24} 
              onChange={this.switchHourFormat.bind(this)}
            />
            <span className="slider round"></span>
          </label>
          <span className="full">24 hour</span>
        </div>
        
        {sessionTimes.map((time, index) => {
          if (time.year === targetYear 
              && time.month === targetMonth
              && time.date === targetDate
          ) {
            let timeFormated = getTimeFormated(time.hour, time.minute, format24)

            if (time.hour < 12 && !format24) {
              return (
                <p key={index} onClick={this.selectHour.bind(this, time.hour, time.minute, time.blockId)}>{timeFormated}</p>
              )
            } else if (time.hour >= 12 && firstNoon && !format24) {
              firstNoon = false
              return (
                <Fragment key={index}>
                  <h4 className="noon">noon</h4>
                  <p key={index} onClick={this.selectHour.bind(this, time.hour, time.minute, time.blockId)}>{timeFormated}</p>
                </Fragment>
              )
            } else {
              return (
                <p key={index} onClick={this.selectHour.bind(this, time.hour, time.minute, time.blockId)}>{timeFormated}</p>
              )
            } 
          } 
          return null
        })}
      </div>
    )
  }
}
