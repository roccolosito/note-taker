// const router = require("express").Router();
// const store = require("../db/db.json");

// module.exports = function (app) {
//     // GET notes from database
//     app.get("/api/notes", (req, res) => {
//         store.getNotes().then((notes) => res.json(notes))
//             .catch((err) => res.status(500).json(err));
//     });

//     // POST notes to database
//     app.post("/api/notes", (req, res) => {
//         store.saveNote(req.body).then((note) => res.json(note))
//             .catch((err) => res.status(500).json(err));
//     });

//     // DELETE notes with matching id
//     app.delete("/api/notes/:id", (req, res) => {
//         store.deleteNote(req.body).then((note) => res.json(note))
//             .catch((err) => res.status(500).json(err));
//     });
// };


const note_data = require("../db/db.json");
//const router = require("express").Router();
// exporting html paths
module.exports = function(app) {

    app.get("/api/notes/", function(req,res) {
        res.json(note_data);
    });

    app.post("/api/notes/", function(req,res) {
        note_data.push(req.body);
        res.json(true);
    })

    app.delete("/api/notes/:id", function(req,res) {
        note_data.length = 0;

        res.json({ok: true});
    })

};