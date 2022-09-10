const { User } = require('../models');

const model = User;

const data = [
    {
        username: 'mys4jalloh',
        email: 'mys4jalloh@gmail.com',
        password: 'P@ssword1'
    },
    {
        username: 'pinaraktas81',
        email: 'pinaraktas81@gmail.com',
        password: 'P@ssword1'
    },
    {
        username: 'bremus124',
        email: 'bremus124@gmail.com',
        password: 'P@ssword1'
    },
    {
        username: 'summerjay0401',
        email: 'summerjadefrosal@gmail.com',
        password: 'P@ssword1'
    },
];

const seeds = () => model.bulkCreate(data);

module.exports = seeds;
