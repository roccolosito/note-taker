const fs = require('fs');
const store = require("../db/db.json");

module.exports = function (app) {
    // GET notes from database
    app.get("/api/notes", (req, res) => {
        store.getNotes().then((notes) => res.json(notes))
            .catch((err) => res.status(500).json(err));
    });

    // POST notes to database
    app.post("/api/notes", (req, res) => {
        store.saveNote(req.body).then((note) => res.json(note))
            .catch((err) => res.status(500).json(err));
    });

    // DELETE notes with matching id
    app.delete("/api/notes/:id", (req, res) => {
        store.deleteNote(req.body).then((note) => res.json(note))
            .catch((err) => res.status(500).json(err));
    });
};