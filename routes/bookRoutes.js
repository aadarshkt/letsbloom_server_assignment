import { Router } from "express";
import { getAllbooks, insertBook, updateBook, deleteBook } from "../controllers/bookController.js";
import { body, query, validationResult } from "express-validator";

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
  await getAllbooks(req, res);
});

//adding validation such that id query parameter is not empty
//escape helps to prevent XSS -> cross-site scripting vulnerability

const validate_ID = () => query("id").trim().notEmpty().escape().withMessage("Id not valid");
const validate_title = () => body("title").trim().notEmpty().escape().withMessage("title not valid");
const validate_author = () => body("author").trim().notEmpty().escape().withMessage("author not valid");
const validate_year_published = () =>
  body("year_published").trim().notEmpty().escape().withMessage("year published not valid");
const validate_year = () => body("year_published").isInt({ min: 868, max: 2024 }).withMessage("Year range is wrong");

bookRouter.post(
  "/",
  validate_title(),
  validate_author(),
  validate_year_published(),
  validate_year(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({
        errors: result.array(),
      });
      return;
    }
    await insertBook(req, res);
  }
);

// isDate(options?: {
//   format?: string;
//   delimiters?: string[];
//   strictMode?: boolean;
// }): ValidationChain

bookRouter.put(
  "/",
  validate_ID(),
  validate_title(),
  validate_author(),
  validate_year_published(),
  validate_year(),
  async (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({
        errors: result.array(),
      });
      return;
    }
    await updateBook(req, res);
  }
);

bookRouter.delete("/", validate_ID(), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({
      errors: result.array(),
    });
    return;
  }
  await deleteBook(req, res);
});

export default bookRouter;
