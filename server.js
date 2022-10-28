// Specify a constraint to express a constant.
const express = require("express");

const fs = require("fs");
const path = require("path");

// Sets the port of the environment variable.
const PORT = process.env.PORT || 3002;

// Extends the express app with a new app.
const app = express();

// parse incoming string or array data's
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// middleware for public files
app.use(express.static("public"));

// Load a db. json file
const { notes } = require("./db/db.json");

// Creates a new note.
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  //return code to post route for response
  return note;
}

// validating data
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

// route Get
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// route to server to accept data to be used or stored server-side
app.post("/api/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  //if any data in req.body is incorrect, send error/
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not formatted correctly.");
  } else {
    // add note to json file and array in this function
    const note = createNewNote(req.body, notes);

    res.json(note);
  }
});

// route to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// route to notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Start the API server.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
