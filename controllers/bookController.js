import { query } from "../config/db.js";

const getAllbooks = async (req, res) => {
  const allBookList = await query("SELECT * FROM books");
  res.json(allBookList.rows);
};

const insertBook = async (req, res) => {
  const { title, author, year_published, ISBN } = req.body;

  //check for already existing values
  const check_query = 'SELECT * FROM books WHERE title = $1 AND author = $2 AND year_published = $3 AND "ISBN" = $4';
  const check_result = await query(check_query, [title, author, year_published, ISBN]);
  if (check_result.length > 0) {
    res.status(400).json({
      message: "Duplicate book, Invalid request",
    });
    return;
  }

  const insert_query = 'INSERT INTO books (title, author, year_published, "ISBN") VALUES ($1, $2, $3, $4)';
  const result = await query(insert_query, [title, author, year_published, ISBN]);

  //handle duplicate entry
  //if duplicate affectedRows will be zero
  if (result.affectedRows == 0) {
    res.status(400).json({
      message: "duplicate entry Bad request",
    });
    return;
  }
  res.json({ message: result.rowCount });
};

const updateBook = async (req, res) => {
  const bookId = req.query.id;
  console.log("bookId", bookId);
  const { title, author, year_published, ISBN } = req.body;
  const update_query = 'UPDATE books SET title = $1, author = $2, year_published = $3, "ISBN" = $4 WHERE id = $5';
  const result = await query(update_query, [title, author, year_published, ISBN, bookId]);

  //handling error if updating non-existent book
  if (result.affectedRows == 0) {
    res.status(400).json({
      message: "Invalid book ID, Bad request",
    });

    return;
  }
  res.json({ message: result.rowCount });
};

const deleteBook = async (req, res) => {
  const bookId = req.query.id;
  const delete_query = "DELETE FROM books WHERE id = $1";
  const result = await query(delete_query, [bookId]);

  if (result.affectedRows == 0) {
    res.status(400).json({
      message: "Invalid book ID, Bad request",
    });
    return;
  }

  return res.json({ message: `Deleted book with id ${bookId}` });
};

export { getAllbooks, insertBook, updateBook, deleteBook };
