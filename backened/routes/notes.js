const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser.js");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note.js");

// route-1 Get all the notes using GET "api/notes/fetchallnotes"  login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});

//Route-2 Add notes using POST "api/notes/addnotes"  login required

router.post(
  "/addnotes",
  fetchuser,
  [
    // Validation of email, name and password
    body("title").isLength({ min: 3 }).withMessage("Enter a title"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be atleast of 5 characters"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are errors, return bad request with errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// Route-3 Get all the notes using PUT "api/notes/uodatenote"  login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // create a new note object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //  find the note to be updated and update it.
  let note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});

// Route-4 Delete the notes using delete "api/notes/deletenote"  login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Find the note to be deleted and delete it
      let note = await Note.findById(noteId);
      if (!note) {
        return res.status(404).send("Note not found");
      }
  
      // Allow deletion only when the user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }
  
      note = await Note.findByIdAndDelete(noteId);
      res.json({ success: "Note has been deleted", note });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });

module.exports = router;
