const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');

// Array que simula um banco de dados de usuários, contendo objetos com informações básicas
const users = [
  { id: '1', name: 'Julio', email: 'julio@email.com', password: '123456' },
  { id: '2', name: 'Jhon Doe', email: 'john@email.com', password: '123456' },
];

module.exports = {
  // Obtem todos os usuários no array 'users'
  getAllUsers: () => users,

  // Busca um usuário pelo ID
  getUserById: (id) => users.find((user) => user.id === id),

  // Busca um usuário pelo email
  getUserByEmail: (email) => users.find((user) => user.email === email),

  // Cria um novo usuário
  createUser: (name, email, password) => {
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
