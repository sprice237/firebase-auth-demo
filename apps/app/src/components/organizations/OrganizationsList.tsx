import React, { useState } from 'react';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { useOrganizationsQuery } from '@sprice237/firebase-auth-demo-gql';
import { Cmp } from '$types';
import { OrganizationEditModal } from './OrganizationEditModal';

export const OrganizationsList: Cmp = () => {
  const { data: { organizations } = { organizations: undefined } } = useOrganizationsQuery();
  const [organizationIdToEdit, setOrganizationIdToEdit] = useState<string | undefined>();

  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Organization',
      flex: 1,
      renderCell: (props) => <>{props.value}</>,
    },
    {
      field: 'id',
      renderCell: (props) => (
        <button onClick={() => setOrganizationIdToEdit(props.value as string)}>Edit</button>
      ),
    },
  ];

  return (
    <>
      {organizationIdToEdit && (
        <OrganizationEditModal
          organizationId={organizationIdToEdit}
          onClose={() => setOrganizationIdToEdit(undefined)}
        />
      )}
      <DataGrid columns={columns} rows={organizations ?? []} />
    </>
  );
};
