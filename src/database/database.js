const { Pool } = require('pg');
const pool = new Pool({
  user: 'nathan',
  host: 'dpg-cmvs96gcmk4c73ajmr1g-a.oregon-postgres.render.com',
  database: 'escoladb_pn5q',
  password: 'nPO4tl0kYY7jzhYGu196VpccGXOHbvVn',
  port: 5432,
  ssl: true,
});

module.exports = {
    pool,
}
