import { AppResolversMap } from '$gql/resolvers';
import { meResolvers } from './me';
import { organizationResolvers } from './organizations';

export const resolvers: AppResolversMap['Query'] = {
  ...meResolvers,
  ...organizationResolvers,
};
