import React from 'react';
import ReactDOM from 'react-dom';


import Routes from './routers';
import { store } from './reduxs/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <React.Suspense fallback={<div className="blank"></div>}>
          <Routes />
    </React.Suspense>
  </Provider>,
  document.getElementById('root')
);
