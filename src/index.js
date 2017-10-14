import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Redux from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers'; 

const store = Redux.createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
     <App />,
  </Provider>,
  document.getElementById('root')
);
