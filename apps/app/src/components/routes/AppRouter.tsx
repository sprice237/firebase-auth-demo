import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Cmp, RouteCmp } from '$types';
import { HomeRoute } from './HomeRoute';
import { LoginRoute } from './LoginRoute';

const routes: RouteCmp[] = [LoginRoute, HomeRoute];

export const AppRouter: Cmp = () => {
  return (
    <Switch>
      {routes.map(({ routes: routeRoutes }) => routeRoutes)}
      <Redirect to={HomeRoute.path} />
    </Switch>
  );
};
