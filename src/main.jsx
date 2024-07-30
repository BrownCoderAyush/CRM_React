import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import App from './App.jsx'

//css imports
import './index.css'

// https://www.subframe.com/blog/how-to-make-tailwind-desktop-first
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>

)
