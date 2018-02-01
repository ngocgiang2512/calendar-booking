import React from 'react'
import SessionNavigation from './SessionNavigation'
import { getSessionTemplates } from '../../api'

export default class SessionList extends React.Component {
  componentDidMount() {
    let promise = getSessionTemplates()
    promise
      .then((sessionTemplates) => {
        this.props.updateSessions({sessionTemplates: sessionTemplates})
      })
  }
  
  selectSession(template) {
    this.props.updateSessions({selectedTemplate: template, step: 'date'})
  }

  render() {
    let { sessionTemplates } = this.props
    return (
      <div className="calendar list">
        <SessionNavigation title="Select a Session" {...this.props} />
        <div className='sessionBody sessionList'>
          {sessionTemplates.map((template, index) => (
            <div 
              key={index} 
              className="item" 
              onClick={this.selectSession.bind(this, template)}
            >
              <p className="templateName">{template.name}</p>
              <div className="clearfix">
                <p className="templateTime">{template.duration + ' minutes'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
