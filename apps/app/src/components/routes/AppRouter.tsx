import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Cmp, RouteCmp } from '$types';
import { HomeRoute } from './HomeRoute';

const routes: RouteCmp[] = [HomeRoute];

export const AppRouter: Cmp = () => {
  return (
    <Switch>
      {routes.map(({ routes: routeRoutes }) => routeRoutes)}
      <Redirect to={HomeRoute.path} />
    </Switch>
  );
};
