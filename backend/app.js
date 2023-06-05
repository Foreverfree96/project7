const express = require("express");
const app = express();

// MiddleWare
app.use(express.json());

//LOOK HERE FOR DOTENV STUFF
require("dotenv").config();
let test = process.env.TEST;
console.log(test);

// Connect to the database
const db = require("./db");
db.connect();

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/api/users", (req, res) => {
  //const employee = req.body; // Assuming the employee object is sent in the request body

  let employee = {
    id: 5,
    first_name: "ted",
    last_name: "bundy",
    email: "tedbundy@gmail.com",
    hire_date: "10/15/2023",
  };

  // Extract the employee object properties
  const { id, first_name, last_name, email, hire_date } = employee;

  // SQL query to insert the employee into the table
  // const query =
  //   "INSERT INTO employees (id, first_name, last_name, email, hire_date) VALUES ($1, $2, $3, $4, $5)";

  //   const values = [id, first_name, last_name, email, hire_date];

  //insert object into table
  // db.pool.query(query, values, (err) => {
  //   if (err) {
  //     console.error("Error executing query:", err);
  //     res.status(500).json({ error: "Failed to insert employee" });
  //   } else {
  //     res.json({ message: "Employee inserted successfully" });
  //   }
  // });

  //get all rows from table
  db.pool.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Failed to retrieve employees" });
    } else {
      res.json(result.rows);
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//id
//first_name
//last_name
//email
//hire_date
