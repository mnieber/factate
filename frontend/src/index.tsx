import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'src/app/components';
import 'src/frames/styles/index.scss';

const strict = false;

ReactDOM.render(
  strict ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  ),
  document.getElementById('root')
);
