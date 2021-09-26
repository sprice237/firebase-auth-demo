import { AppResolversMap } from '$gql/resolvers';
import { organizationResolvers } from './organizations';

export const resolvers: AppResolversMap['Mutation'] = {
  ...organizationResolvers,
};
