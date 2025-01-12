const HttpError = require('../errors/HTTPError');
const uuid = require('uuid').v4;

// Lista inicial de livros simulada como um banco de dados em memória
let books = [
  { id: '1', title: 'Book One', author: 'Author One', quantityAvailble: 4 },
  { id: '2', title: 'Book Two', author: 'Author Two', quantityAvailble: 3 },
];

module.exports = {
  // Retorna uma lista simplificada de todos os livros (apenas ID e título).
  getAllBooks: () => books.map((book) => ({ id: book.id, title: book.title })),

  // Busca um livro pelo ID.
  getBookById: (id) => books.find((book) => book.id === id),

  // Cria um novo livro e o adiciona à lista.
  createBook: (title, author, quantityAvailble) => {
    const newBook = {
      id: uuid(),
      title,
      author,
      quantityAvailble,
    };

    books.push(newBook);

    return newBook;
  },

  // Atualiza os dados de um livro específico pelo ID.
  updateBook: (id, updatedBook) => {
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) throw new HttpError(404, 'Livro não encontrado!');

    // Atualiza os dados do livro com as informações fornecidas
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };

    return books[bookIndex];
  },

  // Remove um livro da lista pelo ID.
  deleteBook: (id) => {
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) throw new HttpError(404, 'Livro não encontrado!');

    const deletedBook = books[bookIndex];

    // Remove o livro da lista
    books = books.filter((book) => book.id !== id);

    return deletedBook;
  },
};
