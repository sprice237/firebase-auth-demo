import { UnitOfWork } from '@sprice237/firebase-auth-demo-db';
import type { QueryResolvers } from '.';

export const organizations: QueryResolvers['organizations'] = async () => {
  const uow = new UnitOfWork();
  const organizations = await uow.OrganizationsRepository.getAllOrganizations();
  const gqlOrganizations = organizations.map(organization => ({
    ...organization.toJSON(),
    __typename: 'Organization' as 'Organization'
  }));
  return gqlOrganizations;
};

export const organizationsForUser: QueryResolvers['organizationsForUser'] = async (_source, args) => {
  const uow = new UnitOfWork();
  const organizations = await uow.OrganizationsRepository.getOrganizationsForUser(args.userId);
  const gqlOrganizations = organizations.map(organization => ({
    ...organization.toJSON(),
    __typename: 'Organization' as 'Organization'
  }));
  return gqlOrganizations;
};