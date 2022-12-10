import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import 'antd/dist/antd.min.css';
import 'tw-elements';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
