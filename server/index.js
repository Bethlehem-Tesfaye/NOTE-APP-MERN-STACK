import express from "express";
import cors from "cors";
import router from "./routes/auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import noteRouter from "./routes/note.js";
const app = express();

dotenv.config();

app.use(cors()); //to enable cross origin resource sharing so to allow backedn to accept rewuest form diffrent domains such as react
app.use(express.json()); // Add this to parse JSON request bodies
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");

    // routes
    app.use("/api/auth", router);
    app.use("/api/note", noteRouter);

    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
