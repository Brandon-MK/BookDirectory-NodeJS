const router = require("express").Router();
const books = require("./data");

let booksdir = books;

router.get("/books", (req, res) => {
  res.send(booksdir);
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = booksdir.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Book doesn't exist!");

  res.send(book);
});

router.post("/books", (req, res) => {
  const {
    isbn,
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website,
  } = req.body;
  const bookExist = booksdir.find((b) => b.isbn === isbn);
  if (bookExist) return res.status(404).send("Book Exists!");

  const book = {
    isbn,
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website,
  };
  booksdir.push(book);
  res.send(book);
});

router.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const {
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website,
  } = req.body;

  const book = booksdir.find((b) => b.isbn === id);
  if (!book) return res.send("Book doesn't exist!");

  const update = (val, prev) => (!val ? prev : val);

  const updateBook = {
    ...book,
    title: update(title, book.title),
    subtitle: update(subtitle, book.subtitle),
    author: update(author, book.author),
    published: update(published, book.published),
    publisher: update(publisher, book.publisher),
    pages: update(pages, book.pages),
    description: update(description, book.description),
    website: update(website, book.website),
  };

  const bookIndex = booksdir.findIndex((b) => b.isbn === id);
  booksdir.splice(bookIndex, 1);

  res.send(updateBook);
});

router.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  let book = booksdir.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Book doesn't exist!");

  booksdir = booksdir.filter((b) => b.isbn !== id);
  res.send("success");
});

module.exports = router;
