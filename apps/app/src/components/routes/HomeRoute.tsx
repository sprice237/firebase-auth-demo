import React from 'react';
import { Route } from 'react-router-dom';
import { RouteCmp } from '$types';

export const HomeRoute: RouteCmp = () => {
  return <p>Home</p>;
};

HomeRoute.path = '/home';
HomeRoute.routes = [<Route exact path={HomeRoute.path} component={HomeRoute} />];
