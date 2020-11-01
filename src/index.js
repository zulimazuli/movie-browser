import React, { Suspense } from 'react';
import './env';
import ReactDOM from 'react-dom';
import Spinner from './components//UI/Spinner/Spinner';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n';

const app = (
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>
);

ReactDOM.render(
  <React.StrictMode>      
        {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
