import React from 'react';
import { Route } from 'react-router-dom';
import { RouteCmp } from '$types';
import { Login } from '$cmp/auth/Login';

export const LoginRoute: RouteCmp = () => {
  return <Login />;
};

LoginRoute.path = '/login';
LoginRoute.routes = [<Route exact path={LoginRoute.path} component={LoginRoute} />];
LoginRoute.allowUnauthenticated = true;
