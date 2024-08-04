//css imports
import './index.css';

import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import store from './Redux/store.js';

// https://www.subframe.com/blog/how-to-make-tailwind-desktop-first
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
  </BrowserRouter>

);
