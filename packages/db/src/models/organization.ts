import { Model, ModelObject } from 'objection';
import { OrganizationUserModel } from './organizationUser';

export class OrganizationModel extends Model {
  static override tableName = 'organizations';

  static override relationMappings = {
    organizationUsers: {
      relation: Model.HasManyRelation,
      modelClass: OrganizationUserModel,
      join: {
        from: 'organizations.id',
        to: 'organization_users.organization_id'
      }
    }
  }

  id!: string;
  name!: string;
}

export type Organization = ModelObject<OrganizationModel>;
