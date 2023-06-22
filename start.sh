#!/sh
cd "dist/src/infra/db/postgres/knex" && npx knex migrate:latest && npx knex seed:run && cd ../../../../../../ && npm start

