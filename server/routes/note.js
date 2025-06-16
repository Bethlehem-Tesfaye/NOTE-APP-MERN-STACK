import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const noteRouter = express.Router();

noteRouter.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({
      title: title,
      description: description,
      userId: req.user.id,
    });

    await newNote.save();

    return res.status(200).json({ success: true, message: "Note added" });
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ success: false, message: "error creating note" });
  }
});
noteRouter.get("/notes", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }); // fetch notes by logged-in user
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Can't retrieve notes" });
  }
});
noteRouter.put("/edit/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateNotes = await Note.findByIdAndUpdate(id, req.body);
    return res
      .status(200)
      .json({ success: true, updateNotes, message: "Note Edited" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Can't edit notes" });
  }
});
noteRouter.delete("/delete/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Can't edit notes" });
  }
});
export default noteRouter;
