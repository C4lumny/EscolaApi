const { Pool } = require('pg');
const pool = new Pool({
  user: 'nathan',
  host: 'dpg-coqmoni1hbls73eqc290-a.oregon-postgres.render.com',
  database: 'escoladb_0dvo',
  password: 'Xvemp20utiv45mv3tVoA2ywfOZvAi7FR',
  port: 5432,
  ssl: true,
});

module.exports = {
    pool,
}
