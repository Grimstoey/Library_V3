import express from "express";
import { libraryRouter } from "./routes/LibraryRoute";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Library API is running");
});

// Use the library router
app.use("/", libraryRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
