import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Router } from 'react-router-dom';
import { PagesSwitch } from 'src/pages/components';

type PropsT = {};

export const history = createBrowserHistory();

export const UrlRouter: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <Router history={history}>
      <PagesSwitch />
    </Router>
  );
});
