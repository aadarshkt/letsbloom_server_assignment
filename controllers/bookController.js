import query from "../config/db.js";

const getAllbooks = async (req, res) => {
  const allBookList = await query("SELECT * FROM books");
  res.json(allBookList);
};

const insertBook = async (req, res) => {
  const { title, author, year_published, ISBN } = req.body;
  const insert_query = "INSERT INTO books (title, author, year_published, ISBN) VALUES (?, ?, ?, ?)";
  const result = await query(insert_query, [title, author, year_published, ISBN]);
  res.json(result);
};

const updateBook = async (req, res) => {
  const bookId = req.query.id;
  const { title, author, year_published, ISBN } = req.body;
  const update_query = "UPDATE books SET title = ?, author = ?, year_published = ?, ISBN = ? WHERE id = ?";
  const result = await query(update_query, [title, author, year_published, ISBN, bookId]);
  //handling error if updating non-existent book
  if (result.affectedRows == 0) {
    res.status(400).json({
      message: "Invalid book ID",
    });
    return;
  }
  res.json(result);
};

export { getAllbooks, insertBook, updateBook };
