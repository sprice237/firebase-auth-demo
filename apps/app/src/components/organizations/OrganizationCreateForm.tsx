import React, { useEffect, useMemo } from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { OrganizationsDocument, useCreateOrganizationMutation } from '@sprice237/firebase-auth-demo-gql';
import { Cmp } from '$types';
import { FormikTextField } from '$cmp/form/TextField';
import { LoadingModal } from '$cmp/utils/LoadingModal';

export type OrganizationCreateFormProps = {
  onClose: () => void;
};

type OrganizationCreateFormType = {
  name: string;
};

export const OrganizationCreateForm: Cmp<OrganizationCreateFormProps> = ({ onClose }) => {
  const [createOrganization, { loading: createOrganizationLoading, data: createOrganizationResult }] =
    useCreateOrganizationMutation({
      refetchQueries: [{
        query: OrganizationsDocument
      }]
    });

  const initialValues = useMemo(
    () => ({name: ''}),
    []
  );

  const handleSubmit = (values: OrganizationCreateFormType) => {
    createOrganization({
      variables: {
        input: {
          name: values.name,
        },
      },
    });
  };

  useEffect(() => {
    if (createOrganizationResult) {
      onClose();
    }
  }, [createOrganizationResult]);

  return (
    <>
      {(createOrganizationLoading) && <LoadingModal />}
      {initialValues && (
        <Formik<OrganizationCreateFormType> initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <DialogTitle>Create organization</DialogTitle>
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
