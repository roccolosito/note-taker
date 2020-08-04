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
    });
};

function updateDb(response, notes) {
    // writeFileSync doesn't need callbacks like writeFile, this is updating the DB.json
    // every time it's called throughout the api routing functions
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, '\t'));
    response.json("Ok");
};

