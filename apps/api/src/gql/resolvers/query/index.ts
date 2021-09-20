import { AppResolvers } from '$gql/resolvers';
import * as meResolvers from './me';
import * as organizationResolvers from './organizations';

export type QueryResolvers = Exclude<AppResolvers['Query'], undefined>;

export const resolvers: QueryResolvers = {
  ...meResolvers,
  ...organizationResolvers,
};
