import { Knex } from "knex";


export const seed =  (knex:Knex) => {
    return knex('game-categories').del().then(() => {
        return knex('game-categories').insert([
            {
                id:1,
                name:'name_test_seed'
            }
        ])
    })
}