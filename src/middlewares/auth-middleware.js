const jwt = require('jsonwebtoken');
const usersModel = require('../models/users-model');

module.exports = {
  // Middleware para garantir que o usuário esteja autenticado
  ensureAuth: (req, res, next) => {
    // Obtém o cabeçalho de autorização da requisição
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho de autorização está presente
    if (!authHeader) {
      // Retorna erro 401 (não autorizado) se o cabeçalho estiver ausente
      return res.status(401).json({ message: 'Não autorizado!' });
    }

    // Extrai o token do cabeçalho de autorização
    // O formato esperado do cabeçalho é: "Bearer <token>"
    const token = authHeader.split(' ')[1];

    try {
      // Verifica a validade do token usando a chave secreta
      const { id } = jwt.verify(token, process.env.JWT_KEY);

      // Busca o usuário associado ao ID contido no token
      const user = usersModel.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      // Armazena o usuário autenticado no objeto da requisição
      req.authenticatedUser = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido!' });
    }
  },
};
