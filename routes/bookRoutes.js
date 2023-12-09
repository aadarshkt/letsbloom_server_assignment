import { Router } from "express";
import { getAllbooks } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.get("/", (req, res) => {
  getAllbooks(req, res);
});

export default bookRouter;
