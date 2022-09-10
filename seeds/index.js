const sequelize = require('../config/connection');

const seed_user = require('./user-seeds');

const seedAll = async () => {

    await sequelize.sync({ force: true });

    console.log('\n----- DATABASE SYNCED -----\n');

    console.log('\n----- SEEDING - USERS -----\n');

    await seed_user();

    console.log('\n----- SEEDING - USERS -----\n');

    process.exit(0);

};

seedAll();
