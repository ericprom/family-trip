import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/presentations/App/App'
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
 
render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();