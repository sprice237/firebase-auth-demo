import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Cmp, RouteCmp } from '$types';
import { HomeRoute } from './HomeRoute';
import { LoginRoute } from './LoginRoute';
import { OrganizationsListRoute } from './organizations/OrganizationsListRoute';
import { useCurrentUser } from '$utils/firebase';

const routes: RouteCmp[] = [LoginRoute, HomeRoute, OrganizationsListRoute];

export const AppRouter: Cmp = () => {
  const [user, isFirebaseAuthInitialized] = useCurrentUser();

  if (!isFirebaseAuthInitialized) {
    return null;
  }

  return (
    <Switch>
      {!user &&
        routes
          .filter(({ allowUnauthenticated }) => allowUnauthenticated)
          .map(({ routes: routeRoutes }) => routeRoutes)}
      {!!user &&
        routes
          .filter(({ allowAuthenticated }) => allowAuthenticated)
          .map(({ routes: routeRoutes }) => routeRoutes)}
      {!user && <Redirect to={LoginRoute.path} />}
      {!!user && <Redirect to={HomeRoute.path} />}
    </Switch>
  );
};
