import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.string('role').defaultTo('client')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

