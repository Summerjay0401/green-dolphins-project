require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express');
const multer = require("multer");
const mysql2 = require("mysql2");
const path = require("path");

const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');
const app = express();
// const session = require('express-session');

// const { user } = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// create constants for the application.
const constants = {
  matchRequestStatus: {
    pending: 0,
    accepted: 1,
    rejected: -1,
  },
};

// config multers.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage: storage });

// create datbase connection
const dbConn = mysql2.createConnection({
  host: process.env.DB_HOST || "",
  user: process.env.DB_USER_NAME || "",
  password: process.env.DB_USER_PASSWORD || "",
  database: process.env.DB_NAME || "",
  port: process.env.DB_PORT || "",
});

dbConn.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Database was connected');
  require("./routes")({ app, dbConn, upload, constants });
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', async (req,res) => {
//   res.send('WORKING');
// });

// sequelize.sync({force: true}).then(() => {
//   app.listen(PORT, () => console.log('LISTENING'));
// });




