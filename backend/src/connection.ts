require('dotenv').config();
import knex from 'knex'

const connection = knex({
  client: process.env.DB_CONNECTION || "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
})
export default connection