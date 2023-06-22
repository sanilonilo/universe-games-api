import { Knex } from "knex";


export const seed =  (knex:Knex) => {
    return knex('games').del().then(() => {
        return knex('games').insert([
            {
                id:1,
                name:'name_test_seed',
                description:'description_test_seed',
                image_url:'image_test_seed',
                trailer_url:'trailer_test_seed',
                category_id: 1
            }
        ])
    })
}