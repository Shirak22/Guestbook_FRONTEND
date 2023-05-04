import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app/theme/topaz/index.scss'
import { Provider } from 'react-redux'
import {combineReducers, legacy_createStore as  createStore } from 'redux'
import guestbookReducer from './app/reducers/guestbookreducers'
import authenticationReducer from './app/reducers/authenticationReducer'



const allReducers = combineReducers({
  postReducer:guestbookReducer,
  authReducer:authenticationReducer
})

const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
)
