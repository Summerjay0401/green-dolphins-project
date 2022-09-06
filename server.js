const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');

// const session = require('express-session');

// const { user } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req,res) => {
  res.send('WORKING');
});

sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log('LISTENING'));
});




