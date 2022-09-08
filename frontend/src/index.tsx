import { applyFormatters } from 'mobx-log';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/app/components';
import 'src/frames/styles/index.scss';
import { RoutesProvider } from 'src/routes/components/RoutesProvider';

const strict = false;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (false && process.env.NODE_ENV === 'development') {
  applyFormatters();
}

const body = (
  <RoutesProvider>
    <App />
  </RoutesProvider>
);

root.render(strict ? <React.StrictMode>{body}</React.StrictMode> : body);
