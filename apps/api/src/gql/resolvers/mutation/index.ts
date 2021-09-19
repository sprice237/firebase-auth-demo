import { AppResolvers } from '$gql/resolvers';
import * as organizationResolvers from './organizations';

export type MutationResolvers = Exclude<AppResolvers['Mutation'], undefined>;

export const resolvers: MutationResolvers = {
  ...organizationResolvers,
};
