// Specify a constraint to express a constant.
const express = require("express");

const fs = require("fs");
const path = require("path");

// Sets the port of the environment variable.
const PORT = process.env.PORT || 3001;

// Extends the express app with a new app.
const app = express();

// parse incoming string or array data's
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// Load a db. json file
const { notes } = require("./db/db.json");

// Creates a new note.
function createNewNote(body, noteArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  //return code to post route for response
  return note;
}

// route Get
app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// route to server to accept data to be used or stored server-side
app.post("/ali/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  //if any data in req.body is incorrect, send error/
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not formatted properly.");
  } else {
    // add note to json file and array in this function
    const note = createNewNote(req.body, notes);

    res.json(note);
  }
});

// Start the API server.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
