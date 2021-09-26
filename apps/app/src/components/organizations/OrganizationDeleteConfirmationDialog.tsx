import React, { useEffect } from 'react';
import {
  OrganizationsDocument,
  useDeleteOrganizationMutation,
} from '@sprice237/firebase-auth-demo-gql';
import { ConfirmationDialog } from '$cmp/dialogs/ConfirmationDialog';
import { Cmp } from '$types';
import { LoadingModal } from '$utils/LoadingModal';

export type OrganizationDeleteConfirmationDialogProps = {
  organizationId: string;
  onClose: () => void;
};

export const OrganizationDeleteConfirmationDialog: Cmp<OrganizationDeleteConfirmationDialogProps> =
  ({ organizationId, onClose }) => {
    const [
      deleteOrganization,
      { loading: deleteOrganizationLoading, data: deleteOrganizationResult },
    ] = useDeleteOrganizationMutation({
      refetchQueries: [
        {
          query: OrganizationsDocument,
        },
      ],
    });

    const handleDelete = () => {
      deleteOrganization({
        variables: {
          organizationId,
        },
      });
    };

    useEffect(() => {
      if (deleteOrganizationResult) {
        onClose();
      }
    }, [deleteOrganizationResult]);

    return (
      <>
        {deleteOrganizationLoading && <LoadingModal />}
        <ConfirmationDialog
          message="Are you sure you want to delete this organization?"
          onConfirm={handleDelete}
          onCancel={onClose}
        />
      </>
    );
  };
