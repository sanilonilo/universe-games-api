import config from './knexfile'
import knex from 'knex'

export const database = knex(config)