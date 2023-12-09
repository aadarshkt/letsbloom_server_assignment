import { Router } from "express";
import { getAllbooks, insertBook, updateBook } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.get("/", (req, res) => {
  getAllbooks(req, res);
});

bookRouter.post("/", (req, res) => {
  insertBook(req, res);
});

bookRouter.put("/", (req, res) => {
  updateBook(req, res);
});

export default bookRouter;
