import express from "express";
import { bookService } from "../service/bookService";
import { authorService } from "../service/authorService";
import { memberService } from "../service/memberService";
import { borrowService } from "../service/borrowService";

const router = express.Router();

// ===== Books =====
router.get("/books", async (req, res) => {
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
router.get("/authors", async (req, res) => {
  const authors = await authorService.getAllAuthors();
  res.json(authors);
});

// ===== Members =====
router.get("/members", async (req, res) => {
  const { name } = req.query;
  if (name && typeof name === "string") {
    const members = await memberService.searchMembers(name);
    res.json(members);
  } else {
    res.status(400).json({ error: "Query parameter 'name' is required" });
  }
});

router.get("/members/code/:code", async (req, res) => {
  const member = await memberService.getMemberByCode(req.params.code);
  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ error: "Member not found" });
  }
});

// ===== Borrows =====
router.get("/borrows/due", async (req, res) => {
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

router.get("/borrows/unreturned", async (req, res) => {
  const items = await borrowService.getUnreturnedBooks();
  res.json(items);
});

export const libraryRouter = router;
