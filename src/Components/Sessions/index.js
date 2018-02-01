import React from 'react'
import {blue500} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import SessionHome from './SessionHome'
import SessionList from './SessionList'
import SessionDate from './SessionDate'
import SessionConfirm from './SessionConfirm'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
  }
})

export default class Sessions extends React.Component {
  render() {
    let { sessions } = this.props
    console.log(this.props)
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app-wrapper">
          {sessions.step === 'home' &&
            <SessionHome 
              {...sessions}
              updateSessions={this.props.updateSessions} />
          }
          {sessions.step === 'list' && 
            <SessionList 
              {...sessions}
              updateSessions={this.props.updateSessions}
              resetSessions={this.props.resetSessions} />
          }
          {sessions.step === 'date' && 
            <SessionDate 
              {...sessions}
              updateSessions={this.props.updateSessions}
              resetSessions={this.props.resetSessions} />
          }
          {sessions.step === 'confirm' && 
            <SessionConfirm 
              {...sessions}
              updateSessions={this.props.updateSessions}
              resetSessions={this.props.resetSessions} />
          }
        </div>
      </MuiThemeProvider>
    )
  }
}
