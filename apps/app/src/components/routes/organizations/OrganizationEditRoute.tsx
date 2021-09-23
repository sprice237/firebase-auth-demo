import React from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { OrganizationEditForm } from '$cmp/organizations/OrganizationEditForm';
import { RouteCmp } from '$types';
import { OrganizationsListRoute } from './OrganizationsListRoute';

export const OrganizationEditRoute: RouteCmp = () => {
  const history = useHistory();
  const { organizationId } = useParams<{ organizationId: string}>();

  const onClose = (): void => {
    history.push(OrganizationsListRoute.path)
  };

  return (
    <Card style={{ margin: '10px' }}>
      <CardContent>
        <div style={{ height: '300px' }}>
          <OrganizationEditForm organizationId={organizationId} onClose={onClose} />
        </div>
      </CardContent>
    </Card>
  );
};

OrganizationEditRoute.path = '/organizations/:organizationId';
OrganizationEditRoute.routes = [
  <Route exact path={OrganizationEditRoute.path} component={OrganizationEditRoute} />,
];
OrganizationEditRoute.allowAuthenticated = true;
