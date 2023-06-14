import config from './config/knexfile'
import knex from 'knex'

export const database = knex(config)