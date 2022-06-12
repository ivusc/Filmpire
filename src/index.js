import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import TogglColorModeProvider from './utils/ToggleColoMode';

import App from './components/App';
import store from './app/store';
import './index.css';


ReactDOM.render(
   <Provider store={store}>
      <TogglColorModeProvider>
         <BrowserRouter>
            <App/>
         </BrowserRouter>
      </TogglColorModeProvider>
   </Provider>,
   document.getElementById('root'))