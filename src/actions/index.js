export const UPDATE_SESSIONS_SETTINGS = 'UPDATE_SESSIONS_SETTINGS'
export const RESET_SESSIONS_SETTINGS = 'RESET_SESSIONS_SETTINGS'

export function updateSessionsSettings(payload) {
  return {
    type: 'UPDATE_SESSIONS_SETTINGS',
    payload
  }
}

export function resetSessionsSettings(payload) {
  return {
    type: 'RESET_SESSIONS_SETTINGS',
    payload
  }
}
