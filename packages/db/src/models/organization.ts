import { Model, ModelObject, RelationMappings } from 'objection';
import { OrganizationUserModel } from './organizationUser';

export class OrganizationModel extends Model {
  static override tableName = 'organizations';

  static override get relationMappings(): RelationMappings {
    return {
      organizationUsers: {
        relation: Model.HasManyRelation,
        modelClass: OrganizationUserModel,
        join: {
          from: 'organizations.id',
          to: 'organizationUsers.organizationId',
        },
      },
    };
  }

  id!: string;
  name!: string;
}

export type Organization = ModelObject<OrganizationModel>;
