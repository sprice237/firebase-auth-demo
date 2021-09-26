import React, { useEffect, useMemo } from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  useOrganizationByIdQuery,
  useUpdateOrganizationMutation,
} from '@sprice237/firebase-auth-demo-gql';
import { Cmp } from '$types';
import { FormikTextField } from '$cmp/form/TextField';
import { LoadingModal } from '$cmp/utils/LoadingModal';

export type OrganizationEditFormProps = {
  organizationId: string;
  onClose: () => void;
};

type OrganizationEditFormType = {
  name: string;
};

export const OrganizationEditForm: Cmp<OrganizationEditFormProps> = ({
  organizationId,
  onClose,
}) => {
  const { loading, data: { organizationById: organization } = { organizationById: undefined } } =
    useOrganizationByIdQuery({
      variables: {
        organizationId,
      },
    });

  const [updateOrganization, { called, loading: mutationLoading }] =
    useUpdateOrganizationMutation();

  const initialValues = useMemo(
    () => (organization ? { name: organization.name } : undefined),
    [organization]
  );

  const handleSubmit = (values: OrganizationEditFormType) => {
    updateOrganization({
      variables: {
        organizationId,
        input: {
          name: values.name,
        },
      },
    });
  };

  useEffect(() => {
    if (!loading && !organization) {
      onClose();
    }
  }, [loading, organization]);

  useEffect(() => {
    if (called && !mutationLoading) {
      onClose();
    }
  }, [called, mutationLoading]);

  return (
    <>
      {(loading || mutationLoading) && <LoadingModal />}
      {initialValues && (
        <Formik<OrganizationEditFormType> initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <DialogTitle>Edit organization</DialogTitle>
            <DialogContent>
              <FormikTextField name="name" label="Name" variant="standard" />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Form>
        </Formik>
      )}
    </>
  );
};
