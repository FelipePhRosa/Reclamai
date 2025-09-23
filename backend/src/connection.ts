require('dotenv').config();
import knex from 'knex'

const connection = knex({
  client: process.env.DB_CONNECTION || "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "aluno",
    port: Number(process.env.DB_PORT) || 3306,
    password: process.env.DB_PASSWORD || "senacrs",
    database: process.env.DB_NAME || "reclamai",
  },
})
export default connection