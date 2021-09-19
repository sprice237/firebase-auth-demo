import { OrganizationModel } from '$models/organization';
import { OrganizationUserModel } from '$models/organizationUser';
import type { UnitOfWork } from '$/uow';

export class OrganizationsRepository {
  constructor(private uow: UnitOfWork) { }

  async getAllOrganizations(): Promise<OrganizationModel[]> {
    const organizations = await OrganizationModel.query(this.uow.queryTarget);
    return organizations;
  }

  async getOrganizationsForUser(userId: string): Promise<OrganizationModel[]> {
    const organizationUser = OrganizationUserModel.query(this.uow.queryTarget).where('user_id', userId);

    const organizations = await OrganizationUserModel
      .relatedQuery('organizations', this.uow.queryTarget)
      .for(organizationUser) as OrganizationModel[];

    return organizations;
  }
}