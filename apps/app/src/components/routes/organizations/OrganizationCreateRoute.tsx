import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { RouteCmp } from '$types';
import { OrganizationCreateForm } from '$cmp/organizations/OrganizationCreateForm';
import { OrganizationsListRoute } from './OrganizationsListRoute';

export const OrganizationCreateRoute: RouteCmp = () => {
  const history = useHistory();

  const onClose = (): void => {
    history.push(OrganizationsListRoute.path)
  };

  return (
    <Card style={{ margin: '10px' }}>
      <CardContent>
        <div style={{ height: '300px' }}>
          <OrganizationCreateForm onClose={onClose} />
        </div>
      </CardContent>
    </Card>
  );
};

OrganizationCreateRoute.path = '/organizations/new';
OrganizationCreateRoute.routes = [
  <Route exact path={OrganizationCreateRoute.path} component={OrganizationCreateRoute} />,
];
OrganizationCreateRoute.allowAuthenticated = true;
