import React from 'react';
import { Route } from 'react-router-dom';
import { RouteCmp } from '$types';
import { RegistrationForm } from '$cmp/auth/RegistrationForm';

export const RegistrationRoute: RouteCmp = () => {
  return <RegistrationForm />;
};

RegistrationRoute.path = '/register';
RegistrationRoute.routes = [
  <Route exact path={RegistrationRoute.path} component={RegistrationRoute} />,
];
RegistrationRoute.allowUnauthenticated = true;
