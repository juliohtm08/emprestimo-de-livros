const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');

// Array que simula um banco de dados de usuários, contendo objetos com informações básicas
const users = [
  { id: '1', name: 'Julio', email: 'julio@email.com', password: '123456' },
  { id: '2', name: 'Jhon Doe', email: 'john@email.com', password: '123456' },
];

module.exports = {
  // Função para obter todos os usuários no array 'users'
  getAllUsers: () => users,

  // Função para buscar um usuário pelo ID. Utiliza o método 'find' do array
  getUserById: (id) => users.find((user) => user.id === id),

  // Função para buscar um usuário pelo email. Também utiliza o método 'find'
  getUserByEmail: (email) => users.find((user) => user.email === email),

  // Função para criar um novo usuário
  createUser: (name, email, password) => {
    // Cria um novo objeto de usuário com ID único, nome, email e senha hasheada
    const newUser = {
      id: uuid(),
      name,
      email,
      password: bcrypt.hashSync(password, 10), // Hasheia a senha com o método 'bcrypt.hashSync' e um fator de custo 10
    };

    users.push(newUser);

    return newUser;
  },
};
