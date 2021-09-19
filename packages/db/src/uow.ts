import knexConstructor, * as Knex from 'knex';
import { Model } from 'objection';
import { config } from './config';
import { OrganizationsRepository } from '$repositories/organizationsRepository';

const knexInstance = knexConstructor(config);
Model.knex(knexInstance);

export class UnitOfWork {
  readonly OrganizationsRepository = new OrganizationsRepository(this);
  readonly knexInstance = knexInstance;

  private _transaction: Knex.Transaction | null = null;

  get transaction(): Knex.Transaction | null {
    return this._transaction;
  }

  private set transaction(value: Knex.Transaction | null) {
    this._transaction = value;
  }

  get queryTarget(): Knex.Transaction | Knex {
    return this.transaction ?? this.knexInstance;
  }

  async beginTransaction(): Promise<void> {
    if (this.transaction) {
      throw new Error('A transaction already exists for this unit of work');
    }

    await new Promise<void>((resolve) => {
      this.knexInstance.transaction((trx) => {
        this.transaction = trx;
        resolve();
      });
    });
  }

  async commitTransaction(): Promise<void> {
    if (!this.transaction) {
      throw new Error('A transaction does not exist for this unit of work');
    }

    await this.transaction.commit();
    this.transaction = null;
  }

  async rollbackTransaction(): Promise<void> {
    if (!this.transaction) {
      throw new Error('A transaction does not exist for this unit of work');
    }

    await this.transaction.rollback();
    this.transaction = null;
  }
}
