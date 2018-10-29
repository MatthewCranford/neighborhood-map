import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorScreen from './ErrorScreen';
import * as serviceWorker from './serviceWorker';

window.gm_authFailure = () => {
  ReactDOM.render(<ErrorScreen/>, document.getElementById('root'));
}

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.register();
