// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML ROUTES
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API ROUTES
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json","utf8", function(err, data) {
        if (err) throw (err);
        let notes = JSON.parse(data)
        return res.json(notes);
    })
    
});

// Need POST route
// (this is where I add the UUID)
// read db.json and turn into an array
// push new item from the front into the array
// write to db.json

// Need DELETE function
// (think filter function)

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT, http://localhost:" + PORT);
});