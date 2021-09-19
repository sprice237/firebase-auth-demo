import { AppResolvers } from '$gql/resolvers';
import * as organizationResolvers from './organizations';

export type QueryResolvers = Exclude<AppResolvers['Query'], undefined>;

export const resolvers: QueryResolvers = {
  ...organizationResolvers
};