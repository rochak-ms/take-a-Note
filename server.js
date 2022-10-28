// Specify a constraint to express a constant.
const express = require("express");

// Sets the port of the environment variable.
const PORT = process.env.PORT || 3001;

// Extends the express app with a new app.
const app = express();

// Load a db. json file
const { notes } = require("./db/db.json");

// Start the API server.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
