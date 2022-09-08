import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageView } from 'src/pages/components/PageView';
import { useRoutes } from 'src/routes/hooks/useRoutes';

export const PagesSwitch: React.FC = () => {
  const routes = useRoutes();
  return (
    <Switch>
      <Route exact={true} path={routes.page()}>
        <PageView />
      </Route>
    </Switch>
  );
};
