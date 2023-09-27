import React from 'react'
import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App'
import './app/theme/topaz/index.scss'
import { Provider } from 'react-redux'
import {combineReducers, legacy_createStore as  createStore } from 'redux'
import guestbookReducer from './app/reducers/guestbookreducers'
import Footer from './app/Components/Footer'
const process = import.meta.env; 

if (process.VITE_NODE_ENV === 'production') {
  disableReactDevTools();
}
const allReducers = combineReducers({
  postReducer:guestbookReducer,
})
const reduxdevTools = (nodeenv)=> {
  if(nodeenv === 'development') {
      return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  }else {
    return ''
  }
}

const store = createStore( allReducers,reduxdevTools(process.VITE_NODE_ENV) );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <>
      <App />
      <Footer />
    </>
  </Provider>,

);
