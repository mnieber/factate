import { RouteTable } from 'src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    page: () => '/pages/page',
  });

  return routeTable;
};
