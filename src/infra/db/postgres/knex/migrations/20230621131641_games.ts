import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('games', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('description').notNullable()
        table.string('image_url').notNullable()
        table.string('trailer_url')
        table.integer('category_id')
        table.foreign('category_id')
             .references('id')
             .inTable('game-categories')
             .onDelete('cascade')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('games')
}

