import path from 'path';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import * as Knex from 'knex';

const convertKeysToCamelCase = (obj: { [key: string]: unknown }): { [key: string]: unknown } => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({ ...acc, [camelCase(key)]: value }),
    {}
  );
};

export const config: Knex.Config = {
  client: 'postgresql',
  connection: process.env['DB_CONNECTION_STRING'],
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'migrations'),
  },
  postProcessResponse: (result) =>
    Array.isArray(result)
      ? result.map((row) => convertKeysToCamelCase(row))
      : convertKeysToCamelCase(result),
  wrapIdentifier: (value, origImpl) => (value === '*' ? '*' : origImpl(snakeCase(value))),
};
