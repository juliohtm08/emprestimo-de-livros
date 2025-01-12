const usersModel = require('../models/users-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  // POST /auth/register
  register: (req, res) => {
    const { name, email, password } = req.body;

    // Verifica se os campos são do tipo string e se foram preenchidos
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      // Retorna um erro caso algum campo esteja inválido ou ausente
      return res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios' });
    }

    // Verifica se já existe um usuário cadastrado com o mesmo e-mail
    const existingUser = usersModel.getUserByEmail(email);

    if (existingUser) {
      // Retorna um erro se o e-mail já estiver cadastrado
      return res.status(400).json({ message: 'E-mail já cadastrado!' });
    }

    // Cria um novo usuário usando o modelo de dados
    const newUser = usersModel.createUser(name, email, password);

    // Retorna o usuário criado, excluindo o campo de senha para segurança
    res.status(201).json({ ...newUser, password: undefined });
  },

  // POST /auth/login
  login: (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios' });
    }

    // Busca o usuário no modelo pelo e-mail fornecido
    const user = usersModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais incorretas!' });
    }

    // Cria o payload do token JWT com informações do usuário
    const payload = { id: user.id, email: user.email };

    // Gera o token JWT com uma chave secreta e tempo de expiração de 1 dia
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });

    res.json({ token });
  },
};
