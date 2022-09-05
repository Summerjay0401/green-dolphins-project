const express = require("express");
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req,res) => {
    res.send("WORKING")
});


app.listen(PORT, () => console.log("LISTENING"));


