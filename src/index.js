import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import reducers from './reducers';

const store = createStore(
  reducers,
  composeWithDevTools(),
);

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root')
);
