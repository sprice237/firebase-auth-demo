import { Model, ModelObject, RelationMappings } from 'objection';
import { OrganizationModel } from './organization';

export class OrganizationUserModel extends Model {
  static override tableName = 'organizationUsers';

  static override get relationMappings(): RelationMappings {
    return {
      organizations: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrganizationModel,
        join: {
          from: 'organizationUsers.organizationId',
          to: 'organizations.id',
        },
      },
    };
  }

  organizationId!: string;
  userId!: string;
}

export type OrganizationUser = ModelObject<OrganizationUserModel>;
