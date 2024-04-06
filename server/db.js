const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hoteldb',
  password: '1234hotel',
  port: 5432,
});

module.exports = pool;
