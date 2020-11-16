import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <Suspense fallback={<div style={{ textAlign: 'center', fontSize: '50px' }}>Loading...</div>}>
    <App />
  </Suspense>,
  document.getElementById('root')
);

