const HttpError = require('../errors/HTTPError');

// Middleware de tratamento de erros
module.exports = (error, req, res, next) => {
  // Verifica se há um erro
  if (error) {
    // Verifica se o erro é uma instância de HttpError
    if (error instanceof HttpError) {
      // Se for, responde com o status HTTP e a mensagem associados ao erro
      return res.status(error.status).json({ message: error.message });
    }

    // Para outros tipos de erros, responde com status 400 (Bad Request)
    return res.status(400).json({ message: error.message });
  }

  // Caso nenhum erro seja detectado, chama o próximo middleware
  next();
};
