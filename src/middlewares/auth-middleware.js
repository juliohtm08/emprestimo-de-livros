const jwt = require('jsonwebtoken');
const usersModel = require('../models/users-model');

module.exports = {
  // Middleware para garantir que o usuário esteja autenticado
  ensureAuth: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Não autorizado!' });
    }

    // Extrai o token do cabeçalho de autorização
    const token = authHeader.split(' ')[1];

    try {
      // Verifica a validade do token usando a chave secreta
      const { id } = jwt.verify(token, process.env.JWT_KEY);

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
