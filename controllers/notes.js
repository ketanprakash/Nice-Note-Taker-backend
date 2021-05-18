const client = require('../configs/db')

exports.addNote = (req, res) => {
    const {heading, content} = req.body;

    client.query(`INSERT INTO notes (email, heading, content) VALUES ('${req.email}', '${heading}', '${content}')`).then(() => {
        res.status(200).json({
            message: "Note added successfully"
        })
    });
}

exports.getAllNotes = (req, res) => {
    client.query(`SELECT * FROM notes WHERE email = '${req.email}'`).then((data) => {
        console.log(data.rows)
        res.status(200).json(data.rows);
    });
}

exports.updateNote = (req, res) => {
    console.log(req.params.noteId);
    const {heading, content} = req.body;
    client.query(`UPDATE notes SET heading = '${heading}', content = '${content}' WHERE id = ${req.params.noteId} and email = '${req.email}'`).then(() => {
        res.status(200).json({
            message: "Note updated successfully"
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Database error"
        })
    });
}

exports.deleteNote = (req, res) => {
    console.log(req.params.noteId);
    client.query(`DELETE FROM notes WHERE id = ${req.params.noteId} and email = '${req.email}'`).then(() => {
        res.status(200).json({
            message: "Note deleted successfully"
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Database error"
        })
    });
}