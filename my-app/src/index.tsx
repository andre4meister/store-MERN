import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import './index.scss';
import GlobalAlert from 'components/Alert/GlobalAlert';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <GlobalAlert />
    </Provider>
  </React.StrictMode>,
);
