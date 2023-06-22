import { Knex } from "knex";


export const seed =  (knex:Knex) => {
    return knex('users').del().then(() => {
        return knex('users').insert([
            {
                id:1,
                name:'name_test_seed',
                email:'email@test.seed',
                password:'password_test_seed'
            }
        ])
    })
}