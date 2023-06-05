const { Pool } = require("pg");

let pass = process.env.PASS;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: pass,
  database: "postgres",
});

function connect() {
  pool.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database");
    }
  });
}

module.exports = {
  pool,
  connect,
};
