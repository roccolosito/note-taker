const fs = require('fs');
const path = require('path');
const uuid = require("uuid");
const store = require('../db/db.json');

module.exports = function (app) {
    // GET notes from database
    app.get("/api/notes", (req, res) => {
        fs.readFile(store, "utf8", function (err, data) {
            if (err) {
                throw err;
            }
            return res.json(JSON.parse(data));
        });
    });

    // POST notes to database
    app.post("/api/notes", (req, res) => {
        fs.readFile(store, "utf8", function (err1, data1) {
            if (err1) {
                throw err1;
            }
            let arrData = JSON.parse(data1);
            let note = req.body;
            note.id = uuid.v4();
            arrData.push(note);
            fs.writeFile(store, JSON.stringify(arrData, null, 2), function (err2) {
                console.log("added note");
                if (err2) {
                    throw err2;
                }
                return res.json(arrData);
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
                console.log("obj removed");
                return res.json(noteObj);
            });
        });
    });
};