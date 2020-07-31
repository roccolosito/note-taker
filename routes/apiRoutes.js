const fs = require('fs');
const path = require('path');

module.exports = app => {

    // API ROUTES
    // ========================================================

    // Setup the /api/notes get route
    app.get("/api/notes", function (req, response) {
        // Read the db.json file and return all saved notes as JSON.
        fs.readFile("./db/db.json", "utf8", (err, data) => {

            if (err) throw err;

            var notes = JSON.parse(data);
            response.json(notes);
        });
    });

    // POST - Setup the /api/notes post route
    app.post("/api/notes", function (req, response) {
        // Receives a new note, adds it to db.json, then returns the new note
        let newNote = req.body;
        fs.readFile("./db/db.json", "utf8", (err, data) => {

            if (err) throw err;

            var notes = JSON.parse(data);
            notes.push(newNote);
            updateDb(response, notes);
        });

        // return console.log("Added new note: " + newNote.title);
    });

    // GET - Retrieves a note with specific id
    app.get("/api/notes/:id", function (req, res) {
        // display json for the notes array indices of the provided id
        res.json(notes[req.params.id]);
    });

    // DELETE - Removes a note with specific id
    app.delete("/api/notes/:id", function (req, response) {
        fs.readFile("./db/db.json", "utf8", (err, data) => {

            if (err) throw err;

            var notes = JSON.parse(data);
            notes.splice(req.params.id, 1);
            updateDb(response, notes);
        });
        // console.log("Deleted note with id " + req.params.id);
    });

    //updates the json file whenever a note is added or deleted
};

function updateDb(response, notes) {
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, '\t'));
    response.json("Ok");
};

