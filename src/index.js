import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';


import Routes from './router';
import store from './config/configureStore';
import { Provider } from 'react-redux';


//import CommonRoute  from './route/CommonRoute';




ReactDOM.render(
  <Provider store={store}>
          <Routes />
  </Provider>,
  document.getElementById('root')
);
