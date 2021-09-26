import React, { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { useOrganizationsQuery } from '@sprice237/firebase-auth-demo-gql';
import { Cmp } from '$types';
import { Link } from 'react-router-dom';
import { OrganizationCreateRoute } from '$cmp/routes/organizations/OrganizationCreateRoute';
import { OrganizationDeleteConfirmationDialog } from './OrganizationDeleteConfirmationDialog';

export const OrganizationsList: Cmp = () => {
  const [organizationIdToDelete, setOrganizationIdToDelete] = useState<string | undefined>();
  const { data: { organizations } = { organizations: undefined } } = useOrganizationsQuery();

  const columns: GridColumns = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Organization',
        flex: 1,
      },
      {
        field: '',
        width: 200,
        renderCell: (props) => (
          <>
            <Button
              component={Link}
              to={`/organizations/${props.id as string}`}
              variant="contained"
            >
              Edit
            </Button>
            <Button
              onClick={() => setOrganizationIdToDelete(props.id as string)}
              variant="contained"
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      {organizationIdToDelete && (
        <OrganizationDeleteConfirmationDialog
          organizationId={organizationIdToDelete}
          onClose={() => setOrganizationIdToDelete(undefined)}
        />
      )}
      <Button component={Link} to={OrganizationCreateRoute.path} variant="contained">
        Create
      </Button>
      <DataGrid columns={columns} rows={organizations ?? []} />
    </>
  );
};
