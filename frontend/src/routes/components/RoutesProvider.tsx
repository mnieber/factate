import React from 'react';
import { getRouteTable as getPagesRouteTable } from 'src/pages/routeTable';
import { RouteTable } from 'src/routes/utils/RouteTable';

export const RoutesContext = React.createContext<RouteTable>(new RouteTable());

type PropsT = React.PropsWithChildren<{}>;

export const RoutesProvider = (props: PropsT) => {
  const routeTable = new RouteTable();
  routeTable.addTable(getPagesRouteTable(), '');

  return (
    <RoutesContext.Provider value={routeTable}>
      {props.children}
    </RoutesContext.Provider>
  );
};
