import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  database: process.env.MARIADB_DATABASE,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASS,
  connectionLimit: process.env.MARIADB_CONN,
});

export async function query(query, args) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query, args);
    return res;
  } finally {
    if (conn) conn.release();
  }
}

export function disconnect() {
  pool.end();
}
