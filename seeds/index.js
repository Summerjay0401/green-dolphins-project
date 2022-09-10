const sequelize = require('../config/connection');

const user_data = require('./user-data.json');

const {
    User
} = require('../models');

const seedAll = async () => {

    await sequelize.sync({ force: true });

    await User.bulkCreate(user_data, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);

};

seedAll();
