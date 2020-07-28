const fs = require('fs');
const path = require('path');
const uuid = require("uuidv4");
const store = require('../db/db.json');

module.exports = function (app) {
    // GET notes from database
    app.get("/api/notes", (req, res) => {
        fs.readFile(store, "utf8", function (err, data) {
            console.log(store);
            if (err) {
                throw err;
            }
            return res.json(JSON.parse(data));
        });
    });

    // Takes a JSON input with keys "title" and "text" and adds a new note object with that message to the db.json file
    app.post("/api/notes", (req, res) => {
        fs.readFile(path.join(__dirname, store), "utf8", function (error, response) {
            if (error) {
                console.log(error);
            }
            const notes = JSON.parse(response);
            const noteRequest = req.body;
            const newNoteId = notes.length + 1;
            const newNote = {
                id: newNoteId,
                title: noteRequest.title,
                text: noteRequest.text
            };
            notes.push(newNote);
            res.json(newNote);
            fs.writeFile(path.join(__dirname, store), JSON.stringify(notes, null, 2), function (err) {
                if (err) throw err;
            });
        });
    });

    // DELETE notes with matching id
    app.delete("/api/notes/:id", (req, res) => {
        fs.readFile(store, "utf8", function (err, data2) {
            if (err) throw err;
            let noteObj = JSON.parse(data2)
            let noteObjRemain = noteObj.filter(obj => (obj.id !== req.params.id));

            fs.writeFile(store, JSON.stringify(noteObjRemain), function (err, data) {
                if (err) throw err;
                return res.json(noteObj);
            });
        });
    });
};