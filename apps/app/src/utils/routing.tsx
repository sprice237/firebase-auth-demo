import React from 'react';
import { generatePath as reactGeneratePath, Redirect, Route, Switch } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import qs from 'qs';
import { Cmp } from '$types';
import { HomeRoute } from '$cmp/routes/HomeRoute';
import { LoginRoute } from '$cmp/routes/LoginRoute';
import { OrganizationsListRoute } from '$cmp/routes/organizations/OrganizationsListRoute';
import { OrganizationCreateRoute } from '$cmp/routes/organizations/OrganizationCreateRoute';
import { OrganizationEditRoute } from '$cmp/routes/organizations/OrganizationEditRoute';
import { useCurrentUser } from './firebase';

export enum Routes {
  Home = 'Home',
  Login = 'Login',
  OrganizationsList = 'OrganizationsList',
  OrganizationCreate = 'OrganizationCreate',
  OrganizationEdit = 'OrganizationEdit',
}

export const RouteDefinitions: Record<
  Routes,
  { path: string; component: Cmp; allowUnauthenticated?: boolean; allowAuthenticated?: boolean }
> = {
  [Routes.Home]: { path: '/home', component: HomeRoute, allowAuthenticated: true },
  [Routes.Login]: { path: '/login', component: LoginRoute, allowUnauthenticated: true },
  [Routes.OrganizationsList]: {
    path: '/organizations',
    component: OrganizationsListRoute,
    allowAuthenticated: true,
  },
  [Routes.OrganizationCreate]: {
    path: '/organizations/new',
    component: OrganizationCreateRoute,
    allowAuthenticated: true,
  },
  [Routes.OrganizationEdit]: {
    path: '/organizations/:organizationId',
    component: OrganizationEditRoute,
    allowAuthenticated: true,
  },
};

export type RouteParameters = {
  [Routes.Home]: {
    path: Record<string, never>;
    query: Record<string, never>;
  };
  [Routes.Login]: {
    path: Record<string, never>;
    query: Record<string, never>;
  };
  [Routes.OrganizationsList]: {
    path: Record<string, never>;
    query: Record<string, never>;
  };
  [Routes.OrganizationCreate]: {
    path: Record<string, never>;
    query: Record<string, never>;
  };
  [Routes.OrganizationEdit]: {
    path: { organizationId: string };
    query: Record<string, never>;
  };
};

export const generatePath = <TRoute extends Routes>(
  route: TRoute,
  pathParams: RouteParameters[TRoute]['path'],
  queryParams: RouteParameters[TRoute]['query']
): string => {
  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
  const baseRoute = reactGeneratePath(route, pathParams as any);
  const routeWithQuery = isEqual(queryParams, {})
    ? baseRoute
    : `${baseRoute}?${qs.stringify(queryParams)}`;
  return routeWithQuery;
};

const routeDefinitions = Object.values(RouteDefinitions);

export const AppRouter: Cmp = () => {
  const [user, isFirebaseAuthInitialized] = useCurrentUser();

  if (!isFirebaseAuthInitialized) {
    return null;
  }

  return (
    <Switch>
      {!user &&
        routeDefinitions
          .filter(({ allowUnauthenticated }) => allowUnauthenticated)
          .map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
      {!!user &&
        routeDefinitions
          .filter(({ allowAuthenticated }) => allowAuthenticated)
          .map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
      {!user && <Redirect to={LoginRoute.path} />}
      {!!user && <Redirect to={RouteDefinitions[Routes.Home].path} />}
    </Switch>
  );
};
