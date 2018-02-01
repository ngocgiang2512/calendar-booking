import { combineReducers } from 'redux'
import sessionsSettings from '../modules/sessionsSettings'

const dynamicJournalSettings = combineReducers({
  sessionsSettings
})

export default dynamicJournalSettings
