import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class SessionHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleBookSession = this.handleBookSession.bind(this);
  }

  handleBookSession() {
    this.props.updateSessions({step: 'list'})
  }

  render() {
    return (
      <div className="calendar home">
        <RaisedButton 
          label="Book Session" 
          primary={true}
          onClick={this.handleBookSession.bind(this)} />
      </div>
    )
  }
}
