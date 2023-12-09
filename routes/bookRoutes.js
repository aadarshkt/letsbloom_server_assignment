import { Router } from "express";
import { getAllbooks, insertBook, updateBook } from "../controllers/bookController.js";
import { body, query, validationResult } from "express-validator";

const bookRouter = Router();

bookRouter.get("/", (req, res) => {
  getAllbooks(req, res);
});

bookRouter.post("/", (req, res) => {
  insertBook(req, res);
});

//adding validation such that id query parameter is not empty
//escape helps to prevent XSS -> cross-site scripting vulnerability

const validate_ID = () => query("id").notEmpty().escape();
const validate_title = () => body("title").notEmpty().escape();
const validate_author = () => body("author").notEmpty().escape();
const validate_year_published = () => body("year_published").notEmpty().escape();
const validate_ISBN = () => body("ISBN").notEmpty().isISBN();

bookRouter.put(
  "/",
  validate_ID(),
  validate_title(),
  validate_author(),
  validate_year_published(),
  validate_ISBN(),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({
        errors: result.array(),
      });
      return;
    }
    updateBook(req, res);
  }
);

export default bookRouter;
