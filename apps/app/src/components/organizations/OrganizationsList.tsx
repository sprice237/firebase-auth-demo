import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useOrganizationsQuery } from '@sprice237/firebase-auth-demo-gql';
import { Cmp } from '$types';

const columns = [{ field: 'name', headerName: 'Organization', flex: 1 }];

export const OrganizationsList: Cmp = () => {
  const { data: { organizations } = { organizations: undefined } } = useOrganizationsQuery();

  return <DataGrid columns={columns} rows={organizations ?? []} />;
};
