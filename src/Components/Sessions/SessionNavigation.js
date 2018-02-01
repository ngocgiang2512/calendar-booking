import React from 'react'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

export default class SessionNavigation extends React.Component {
  handleClose() {
    this.props.resetSessions()
  }

  handleBack(step) {
    this.props.updateSessions({step: step})
  }

  render() {
    return (
      <div className="cal-booking-nav">
        <div className="cal-booking-nav-inner">
          {this.props.prevStep &&
            <IconButton className="backIcon" onClick={this.handleBack.bind(this, this.props.prevStep)}>
              <FontIcon className="material-icons">
                keyboard_arrow_left
              </FontIcon>
            </IconButton>
          }
          <h3>{this.props.title}</h3>
          <IconButton 
            className="closeIcon" 
            onClick={this.handleClose.bind(this)}>
            <FontIcon className="material-icons">
              close
            </FontIcon>
          </IconButton> 
        </div>  
      </div>
    )
  }
}
