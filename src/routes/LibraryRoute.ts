import express from "express";
import { bookService } from "../service/bookService";
import { authorService } from "../service/authorService";
import { memberService } from "../service/memberService";
import { borrowService } from "../service/borrowService";

const router = express.Router();

// ===== Books =====
router.get("/books", async (req, res) => {


  const { keyword, title, pageSize, pageNo } = req.query
  const size = parseInt(pageSize as string) || 10
  const page = parseInt(pageNo as string) || 1

  // ถ้ามี keyword ให้ค้นหาแบบ keyword (หลายฟิลด์)
  if (keyword) {
    const result = await bookService.getAllByKeyword(
      keyword as string,
      size,
      page
    )
    if (result.books.length === 0) {
      res.status(404).json({ error: 'ไม่พบหนังสือ' })
      return
    }
    res.setHeader('x-total-count', result.count.toString())
    return res.json(result)
  }
  if (title && typeof title === "string") {
    const books = await bookService.searchBooks(title);
    res.json(books);
  } else if (pageNo && pageSize) {
    const pageNo = Number(req.query.pageNo)
    const pageSize = Number(req.query.pageSize)
    const result = await bookService.getAllBooks(pageSize, pageNo);
    res.setHeader("x-total-count", result.count.toString());
    res.json(result);
  }
  else {
    const books = await bookService.getAllBooks();
    res.json(books);
  }
});

// ===== Authors =====
router.get("/authors", async (req, res) => {
  if (req.query.pageSize && req.query.pageNo) {

    const pageNo = Number(req.query.pageNo)
    const pageSize = Number(req.query.pageSize)
    const result = await authorService.getAllAuthors(pageSize, pageNo);
    res.setHeader("x-total-count", result.count.toString());
    res.json(result);
  }
  else {
    const result = await authorService.getAllAuthors();
    res.json(result);
  }
});

// ===== Members =====
router.get("/members", async (req, res) => {
  const { title, pageSize, pageNo } = req.query;
  if (title && typeof title === "string") {
    const members = await bookService.searchBooks(title);
    res.json(members);
  } else if (pageNo && pageSize) {
    const pageNo = Number(req.query.pageNo)
    const pageSize = Number(req.query.pageSize)
    const result = await memberService.getAllMembers(pageSize, pageNo);
    res.setHeader("x-total-count", result.count.toString());
    res.json(result);
  }
  else {
    const books = await bookService.getAllBooks();
    res.json(books);
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
  const { date, pageSize, pageNo } = req.query;
  if (!date || typeof date !== "string") {
    res.status(400).json({ error: "Query parameter 'date' is required (YYYY-MM-DD)" });
    return;
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
    return;
  }
  if (pageSize && pageNo) {
    const items = await borrowService.getBooksDueOnDate(parsedDate, Number(pageSize), Number(pageNo));
    res.json(items);
  } else {
    const items = await borrowService.getBooksDueOnDate(parsedDate);
    res.json(items);
  }

});

router.get("/borrows/unreturned", async (req, res) => {
  const items = await borrowService.getUnreturnedBooks();
  res.json(items);
});

export const libraryRouter = router;
