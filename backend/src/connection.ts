require('dotenv').config();
import knex from 'knex'

const connection = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '17091940@ntonio',
    database: 'ottpel' 
  },
})
export default connection