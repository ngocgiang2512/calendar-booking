import { UPDATE_SESSIONS_SETTINGS, RESET_SESSIONS_SETTINGS } from '../actions'

let now = new Date()
let currentYear = now.getFullYear()
let currentMonth = now.getMonth()
let currentDate = now.getDate()
let timezoneOffset = now.getTimezoneOffset()/60*(-1)

let initialSessionsSettings = {
  step: 'home', //home, list, date, confirm
  coachId: 'coach1',
  clientId: 'client1',
  sessionTemplates: [],
  selectedTemplate: {},
  availableBlocks: [],
  availableLocalTimeBlocks: [],
  selectedBlock: null,
  selectedYear: null,
  selectedMonth: null,
  selectedDate: null,
  selectedHour: null,
  selectedMinute: null,
  viewYear: currentYear,
  viewMonth: currentMonth,
  viewDate: currentDate,
  popupYear: currentYear,
  popupMonth: currentMonth,
  showMonthPopup: false,
  format24: true,
  timezoneOffset: timezoneOffset,
  timezoneName: "",
  showTzSelection: false
}

const sessionsSettings = (state = initialSessionsSettings, action) => {
  switch (action.type) {
    case UPDATE_SESSIONS_SETTINGS:
      let payload = action.payload
      return Object.assign({}, state, payload)
    case RESET_SESSIONS_SETTINGS:
      return initialSessionsSettings
    default:
      return state
  }
}

export default sessionsSettings
