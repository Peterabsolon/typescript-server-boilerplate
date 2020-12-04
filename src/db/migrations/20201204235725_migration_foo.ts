import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        title text UNIQUE NOT NULL
    );
  `)
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw('DROP TABLE IF EXISTS users;')
}
