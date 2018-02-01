import { connect } from 'react-redux'
import { updateSessionsSettings, resetSessionsSettings } from '../actions'
import Sessions from '../Components/Sessions';

const mapStateToProps = (state) => ({
  sessions: state.sessionsSettings
})

const mapDispatchToProps = {
  updateSessions: updateSessionsSettings,
  resetSessions: resetSessionsSettings
}

const SessionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sessions)

export default SessionsContainer
