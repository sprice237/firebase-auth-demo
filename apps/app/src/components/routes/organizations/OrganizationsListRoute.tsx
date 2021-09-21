import React from 'react';
import { Route } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { RouteCmp } from '$types';
import { OrganizationsList } from '$cmp/organizations/OrganizationsList';

export const OrganizationsListRoute: RouteCmp = () => {
  return (
    <Card style={{ margin: '10px' }}>
      <CardContent>
        <div style={{ height: '300px' }}>
          <OrganizationsList />
        </div>
      </CardContent>
    </Card>
  );
};

OrganizationsListRoute.path = '/organizations';
OrganizationsListRoute.routes = [
  <Route exact path={OrganizationsListRoute.path} component={OrganizationsListRoute} />,
];
OrganizationsListRoute.allowAuthenticated = true;
