import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
  <Suspense fallback={<div style={{textAlign: 'center', fontSize: '50px'}}>Loading...</div>}>
    <Provider store={store}>
      <App />
    </Provider>
      

  </Suspense>,
  document.getElementById('root')
);

