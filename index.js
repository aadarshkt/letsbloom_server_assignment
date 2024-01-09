import express from "express";
import cors from "cors";
import bookRouter from "./routes/bookRoutes.js";
import { configDotenv } from "dotenv";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/books", bookRouter);

app.listen(port, () => console.log(`Server listening on ${port}`));
