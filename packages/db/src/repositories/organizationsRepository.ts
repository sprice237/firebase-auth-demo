import { Organization, OrganizationModel } from '$models/organization';
import { OrganizationUserModel } from '$models/organizationUser';
import type { UnitOfWork } from '$/uow';

export class OrganizationsRepository {
  constructor(private uow: UnitOfWork) {}

  async getAllOrganizations(): Promise<OrganizationModel[]> {
    const organizations = await OrganizationModel.query(this.uow.queryTarget);
    return organizations;
  }

  async getOrganizationsForUser(userId: string): Promise<OrganizationModel[]> {
    const organizationUser = OrganizationUserModel.query(this.uow.queryTarget).where(
      'userId',
      userId
    );

    const organizations = (await OrganizationUserModel.relatedQuery(
      'organizations',
      this.uow.queryTarget
    ).for(organizationUser)) as OrganizationModel[];

    return organizations;
  }

  async createOrganization(input: Omit<Organization, 'id'>): Promise<OrganizationModel> {
    const organization = await OrganizationModel.query(this.uow.queryTarget)
      .insert(input)
      .returning('*');
    return organization;
  }

  async updateOrganization(
    organizationId: string,
    input: Omit<Organization, 'id'>
  ): Promise<OrganizationModel | undefined> {
    const organization = await OrganizationModel.query(this.uow.queryTarget).patchAndFetchById(
      organizationId,
      input
    ); // this can return undefined
    return organization;
  }

  async deleteOrganization(organizationId: string): Promise<OrganizationModel | undefined> {
    const organization = await OrganizationModel.query(this.uow.queryTarget)
      .deleteById(organizationId)
      .returning('*')
      .first(); // this can return undefined
    return organization;
  }
}
