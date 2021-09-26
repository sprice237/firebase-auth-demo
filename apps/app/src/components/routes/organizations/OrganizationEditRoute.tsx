import React from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { OrganizationEditForm } from '$cmp/organizations/OrganizationEditForm';
import { RouteCmp } from '$types';
import { generatePath, Routes, RouteParameters } from '$utils/routing';

export const OrganizationEditRoute: RouteCmp = () => {
  const history = useHistory();
  const { organizationId } = useParams<RouteParameters[Routes.OrganizationEdit]['path']>();

  const onClose = (): void => {
    history.push(generatePath(Routes.OrganizationsList, {}, {}));
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
