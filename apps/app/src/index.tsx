import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '$cmp/App';

import { firebaseAuth } from '$utils/firebase';

console.log(firebaseAuth);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
