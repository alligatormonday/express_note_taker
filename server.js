// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const UUID = require("uuid")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML ROUTES
// =============================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API ROUTES
// =============================================================
app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw (err);
        let notes = JSON.parse(data)
        return res.json(notes);
    })

});

// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    // console.log(newNote);
    req.body.id = UUID.v1()
    fs.readFile("./db/db.json", "utf8", function(err, data) {
        let existingNote = (JSON.parse(data));
        existingNote.push(newNote);
        console.log(existingNote);
        fs.writeFile("./db/db.json", JSON.stringify(existingNote), "utf8", function(err){
            console.log("Success!")
        })
    })

    res.json(newNote);
});

// let = id

// Need POST route
// generate new Note
// sort data by id
// save data to json again
// newNote.id = id++;

// (UUID)
// read db.json and turn into an array
// push new item from the front into the array
// write to db.json

// Need DELETE function
// (think filter function)

// app.delete
// remove from db.JSON
// .filter
// return whatever doesn't have the id you want to delete

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT, http://localhost:" + PORT);
});