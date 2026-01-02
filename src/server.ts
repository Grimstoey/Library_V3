import express from "express";
import { bookService } from "./services/bookService";
import { authorService } from "./services/authorService";
import { memberService } from "./services/memberService";
import { borrowService } from "./services/borrowService";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Library API is running");
});

// ===== Books =====
app.get("/books", async (req, res) => {
  const { title } = req.query;
  if (title && typeof title === "string") {
    const books = await bookService.searchBooks(title);
    res.json(books);
  } else {
    const books = await bookService.getAllBooks();
    res.json(books);
  }
});

// ===== Authors =====
app.get("/authors", async (req, res) => {
  const authors = await authorService.getAllAuthors();
  res.json(authors);
});

// ===== Members =====
app.get("/members", async (req, res) => {
  const { name } = req.query;
  if (name && typeof name === "string") {
    const members = await memberService.searchMembers(name);
    res.json(members);
  } else {
    const members = await memberService.getAllMembers();
    res.json(members);
  }
});

app.get("/members/:code", async (req, res) => {
  const member = await memberService.getMemberByCode(req.params.code);
  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ error: "Member not found" });
  }
});

// ===== Borrows =====
app.get("/borrows/due", async (req, res) => {
  const { date } = req.query;
  if (!date || typeof date !== "string") {
    res.status(400).json({ error: "Query parameter 'date' is required (YYYY-MM-DD)" });
    return;
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
    return;
  }
  const items = await borrowService.getBooksDueOnDate(parsedDate);
  res.json(items);
});

app.get("/borrows/unreturned", async (req, res) => {
  const items = await borrowService.getUnreturnedBooks();
  res.json(items);
});



////Port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});