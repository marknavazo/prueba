import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './assets/styles/index.scss';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import store from './store';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('app'),
);
