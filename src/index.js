import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { setupStore } from './redux';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const EnhancedApp = () => {
  const store = setupStore();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<EnhancedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
