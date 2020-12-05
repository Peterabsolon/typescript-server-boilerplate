import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE
      users
    RENAME
      title
    TO
      name
  `)
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE
      users
    RENAME
      name
    TO
      title
  `)
}
