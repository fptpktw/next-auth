import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",        // Username for database
  host: "10.112.201.25",        // Hostname of the database
  database: "common",    // Name of the database
  password: "wysiwyg123#",// Password for the database
  port: "5432",        // Port number
});

export const query = (text, params) => pool.query(text, params);