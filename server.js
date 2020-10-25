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
    fs.readFile("./db/db.json", function (err, data) {
        if (err) throw (err);
        let notes = JSON.parse(data)
        return res.json(notes);
    })

});

// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newNote = req.body;
    // console.log(newNote);
    newNote.id = UUID.v1();
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

// Deletes notes - removes from db.json and re-writes to db.json
app.delete("/api/notes/:id", function(req, res) {
    const id = req.params.id
    fs.readFile("./db/db.json",  function(err, data){
        if (err) throw err; 
        const goodData = JSON.parse(data)
        const toWrite = goodData.filter(item => {
            if(id !== item.id){
                return item
            }
        })
        fs.writeFile("./db/db.json", JSON.stringify(toWrite), "utf8", function(err){
            if (err) throw err; 
        })
    })
    res.send("winner winner chicken dinner")

})

// WILDCARD ROUTE
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT, http://localhost:" + PORT);
});