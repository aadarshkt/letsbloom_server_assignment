import query from "../config/db.js";

const getAllbooks = async (req, res) => {
  const allBookList = await query("SELECT * FROM books");
  res.json(allBookList);
};

export { getAllbooks };
