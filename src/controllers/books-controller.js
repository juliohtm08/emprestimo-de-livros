const HttpError = require('../errors/HTTPError');
const booksModel = require('../models/books-model');

module.exports = {
  // GET /api/books
  index: (req, res) => {
    // Obtém a lista de todos os livros do modelo
    const books = booksModel.getAllBooks();

    res.json(books);
  },

  //GET /api/books/:id
  show: (req, res) => {
    const { id } = req.params;

    const book = booksModel.getBookById(id);

    if (!book) {
      throw new HttpError(404, 'Livro não encontrado!');
    }

    res.json(book);
  },

  //POST /api/books
  save: (req, res) => {
    const { title, author, quantityAvailble } = req.body;

    if (
      typeof title !== 'string' ||
      typeof author !== 'string' ||
      typeof quantityAvailble !== 'number'
    ) {
      throw new HttpError(401, 'Campos inválidos');
    }

    const newBook = booksModel.createBook(title, author, quantityAvailble);

    res.status(201).json(newBook);
  },

  // PUT /api/books/:id
  update: (req, res) => {
    const { id } = req.params;
    const { title, author, quantityAvailble } = req.body;

    // Cria um objeto com os campos a serem atualizados
    const fieldsToUpdate = {};

    // Adiciona os campos ao objeto somente se forem fornecidos
    if (title) fieldsToUpdate.title = title;
    if (author) fieldsToUpdate.author = author;
    if (quantityAvailble) fieldsToUpdate.quantityAvailble = quantityAvailble;

    const updatedBook = booksModel.updateBook(id, fieldsToUpdate);

    res.json(updatedBook);
  },

  // DELETE /api/books/:id
  delete: (req, res) => {
    const { id } = req.params;

    const deletedBook = booksModel.deleteBook(id);

    res.status(200).json(deletedBook);
  },
};
