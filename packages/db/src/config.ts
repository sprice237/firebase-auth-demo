import path from 'path';

// take a look at postProcessResponse and wrapIdentifier for converting back and forth between camelCase and snake_case

export const config = {
  client: 'postgresql',
  connection: process.env['DB_CONNECTION_STRING'],
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'migrations')
  }
};
