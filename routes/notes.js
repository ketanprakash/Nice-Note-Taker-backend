const express = require("express");
const { addNote, getAllNotes, updateNote, deleteNote } = require("../controllers/notes");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", verifyToken, addNote);
router.put("/update/:noteId", verifyToken, updateNote);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.get("/getallnotes", verifyToken, getAllNotes);

//middleware
module.exports = router;