const { Sequelize } = require("sequelize");

require("dotenv").config();
let pass = process.env.PASS;

const sequelize = new Sequelize("postgres", "postgres", pass, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

function connect() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
    });
}

module.exports = {
  sequelize,
  connect,
};
