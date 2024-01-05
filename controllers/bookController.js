import query from "../config/db.js";

const getAllbooks = async (req, res) => {
  const allBookList = await query("SELECT * FROM books");
  res.json(allBookList);
};

const insertBook = async (req, res) => {
  const { title, author, year_published, ISBN } = req.body;

  //check for already existing values
  const check_query = "SELECT * FROM books WHERE title = ? AND author = ? AND year_published = ? AND ISBN = ?";
  const check_result = await query(check_query, [title, author, year_published, ISBN]);
  if (check_result.length > 0) {
    res.status(400).json({
      message: "Duplicate book, Invalid request",
    });
    return;
  }

  const insert_query = "INSERT IGNORE INTO books (title, author, year_published, ISBN) VALUES (?, ?, ?, ?)";
  const result = await query(insert_query, [title, author, year_published, ISBN]);

  //handle duplicate entry
  //if duplicate affectedRows will be zero
  if (result.affectedRows == 0) {
    res.status(400).json({
      message: "duplicate entry Bad request",
    });
    return;
  }
  res.json(result);
};

const updateBook = async (req, res) => {
  const bookId = req.query.id;
  console.log("bookId", bookId);
  const { title, author, year_published, ISBN } = req.body;
  const update_query = "UPDATE books SET title = ?, author = ?, year_published = ?, ISBN = ? WHERE id = ?";
  const result = await query(update_query, [title, author, year_published, ISBN, bookId]);

  //handling error if updating non-existent book
  if (result.affectedRows == 0) {
    res.status(400).json({
      message: "Invalid book ID, Bad request",
    });

    return;
  }
  return res.json(result);
};

const deleteBook = async (req, res) => {
  const bookId = req.query.id;
  const delete_query = "DELETE FROM books WHERE id = ?";
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
