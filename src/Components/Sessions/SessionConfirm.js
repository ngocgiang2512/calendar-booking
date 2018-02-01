import React from 'react'
import SessionNavigation from './SessionNavigation'
import RaisedButton from 'material-ui/RaisedButton'
import { getFullDate, getTimeFormated, getTimeZoneInfo } from '../../utils'
import { bookSession } from '../../api'

export default class SessionConfirm extends React.Component {
  handleClose() {
    this.props.resetSessions()
  }

  bookSession(coachId, clientId, timeBegin, timeEnd) {
    console.log(coachId, clientId, timeBegin, timeEnd)
    let bookPromise = bookSession(coachId, clientId)
    bookPromise
      .then(session => {
        console.log(session)
      })
    this.props.resetSessions()
  }
  
  render() {
    let session = this.props
    let timeFormated = getTimeFormated(session.selectedHour, session.selectedMinute, session.format24)
    let selectedBlock = session.availableBlocks.filter(block => block.id === session.selectedBlock)

    return (
      <div className="calendar confirm">
        <SessionNavigation prevStep="date" title="Confirm" {...this.props} />
        <div className="session-info">
          {session.selectedTemplate.name &&
            <p className='session-name'>{session.selectedTemplate.name + ', ' + session.selectedTemplate.duration + ' minutes'}</p>
          }
          <p>Your timezon is: {getTimeZoneInfo(session.timezoneOffset, session.timezoneName)}</p>
          <p>{getFullDate(session.selectedYear, session.selectedMonth, session.selectedDate)}</p>
          <p>{timeFormated}</p>
        </div>
        <div className="sessionBody">
          <div className="button-wrapper">
            <RaisedButton 
              label="Cancel" 
              onClick={this.handleClose.bind(this)} />
            <RaisedButton 
              label="Book" 
              primary={true} 
              onClick={this.bookSession.bind(
                this,
                session.coachId,
                session.clientId,
                selectedBlock[0].timeBegin,
                selectedBlock[0].timeEnd
              )} 
            />
          </div>
        </div>
      </div>
    )
  }
}
