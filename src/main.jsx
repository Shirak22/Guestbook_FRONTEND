import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app/theme/topaz/index.scss'
import { Provider } from 'react-redux'
import {combineReducers, legacy_createStore as  createStore } from 'redux'
import guestbookReducer from './app/reducers/guestbookreducers'
import Footer from './app/Components/Footer'



const allReducers = combineReducers({
  postReducer:guestbookReducer,
})

const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <>
      <App />
      <Footer />
    </>
  </Provider>,

);
