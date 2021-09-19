import { Model, ModelObject } from 'objection';
import { OrganizationModel } from './organization';

export class OrganizationUserModel extends Model {
  static override tableName = 'organization_users';

  static override get relationMappings() { 
    return {
      organizations: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrganizationModel,
        join: {
          from: 'organization_users.organization_id',
          to: 'organizations.id',
        }
      }
    };
  }

  organization_id!: string;
  user_id!: string;
}

export type OrganizationUser = ModelObject<OrganizationUserModel>;