import { UnitOfWork } from '@sprice237/firebase-auth-demo-db';
import { AppResolversMap } from '$gql/resolvers';

export const organizationResolvers: AppResolversMap['Mutation'] = {

  createOrganization: async (
    _source,
    { input }
  ) => {
    const uow = new UnitOfWork();
    const organization = await uow.OrganizationsRepository.createOrganization(input);
    console.log(organization);
    return {
      ...organization,
      __typename: 'Organization' as const,
    };
  },

  updateOrganization: async (
    _source,
    { organizationId, input }
  ) => {
    const uow = new UnitOfWork();
    const organization = await uow.OrganizationsRepository.updateOrganization(organizationId, input);
    if (!organization) {
      throw new Error(`no organization with id ${organizationId}`);
    }
    return {
      ...organization,
      __typename: 'Organization' as const,
    };
  },

  deleteOrganization: async (
    _source,
    { organizationId }
  ) => {
    const uow = new UnitOfWork();
    const organization = await uow.OrganizationsRepository.deleteOrganization(organizationId);
    if (!organization) {
      throw new Error(`no organization with id ${organizationId}`);
    }
    return {
      ...organization,
      __typename: 'Organization' as const,
    };
  }
  
}