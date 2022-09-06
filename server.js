const express = require("express");
// const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;
const sequilize = require("./config/connection");
const { user } = require("./models");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req,res) => {
    res.send("WORKING")
});

sequilize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log("LISTENING"));
});




