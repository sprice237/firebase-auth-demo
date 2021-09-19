import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('organizations', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('name').notNullable();
    table.primary(['id']);
  });

  await knex.schema.createTable('organization_users', (table) => {
    table.uuid('organization_id');
    table.text('user_id');
    table.primary(['organization_id', 'user_id']);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('organization_users');
  await knex.schema.dropTable('organizations');
}

