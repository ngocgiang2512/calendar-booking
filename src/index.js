import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import SessionsContainer from './Containers/SessionsContainer'
import './assets/style/style.css'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <SessionsContainer/>
  </Provider>,
  document.getElementById('root')
)
