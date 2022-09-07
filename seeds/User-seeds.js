const { User } = require('../models/User');

const userData = [
  {
    username: 'mademoisellesummer',
    email: 'summerjadefrosal@gmail.com',
    password: '',
  },
  {
    username: 'monsieurroman',
    email: 'rjrimorin@gmail.com',
    password: '',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
