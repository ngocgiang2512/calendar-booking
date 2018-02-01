import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import moment from 'moment-timezone'
import { getDateFarFromDate, getTimeZoneInfo, classnames } from '../../utils'
import tzByCity from '../../data/timezones'

export default class SessionTimezone extends React.Component {
  state = {
    keyword: ''
  }

  toggleTzSelection() {
    this.props.updateSessions({showTzSelection: !this.props.showTzSelection})
  }

  handleChange(event) {
    let keyword = event.target.value
    this.setState({keyword: keyword})
  }

  updateTimezone(tzName) {
    this.setState({keyword: ''})
    let newTzOffset = moment().tz(tzName).utcOffset()/60
    // change timezone => change original sessions'time
    let newAvailableTimes = this.props.availableLocalTimeBlocks.map(time => getDateFarFromDate(time.year, time.month, time.date, time.hour, time.minute, 0, newTzOffset - this.props.timezoneOffset, time.blockId))

    this.props.updateSessions({availableLocalTimeBlocks: newAvailableTimes, timezoneOffset: newTzOffset, timezoneName: tzName, showTzSelection: false})
  }

  render() {
    let session = this.props
    let tzByHour = tzByCity.map((timezone, index) => {
      let tzOffset = moment().tz(timezone).utcOffset()/60
      if (tzOffset < 0) {
        tzOffset = tzOffset + 20
        tzOffset = "-" + tzOffset
      } else if (tzOffset >= 0 && tzOffset < 10) {
        tzOffset = "0" + tzOffset
      }
      if (tzOffset % 1 === 0) {
        tzOffset += '.0'
      }
      return tzOffset + ":" + timezone
    })
    tzByHour.sort()

    return (
      <div className="tz-selection-wrapper">
        <p className="timezone-info" onClick={this.toggleTzSelection.bind(this)}>
          <span>Your timezone is: {getTimeZoneInfo(session.timezoneOffset, session.timezoneName)}</span>
          <FontIcon className="material-icons">
            arrow_drop_down
          </FontIcon>
        </p>
        <div className={classnames("tz-selection", {show: session.showTzSelection})}>
          <div className="search-box">
            <input 
              type="text"
              name="name"
              placeholder="Search for city or region"
              value={this.state.keyword}
              onChange={this.handleChange.bind(this)} />
          </div>
          <ul>
            {tzByHour.map((tz, index) => {
              let timezone = tz.split(":")[1]
              let tzOffset = moment().tz(timezone).utcOffset()/60
              let tzName = getTimeZoneInfo(tzOffset, timezone)
              let keyword = this.state.keyword
              if (tzName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                if (tzOffset === session.timezoneOffset) {
                  return <li key={index} className="equal-tz" onClick={this.updateTimezone.bind(this, timezone)}>{tzName}</li>
                } else {
                  return <li key={index} onClick={this.updateTimezone.bind(this, timezone)}>{tzName}</li>
                }
              } else {
                return null
              }
            })}
          </ul>
        </div>
      </div>
    )
  }
}
