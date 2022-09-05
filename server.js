const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', async (req,res) => {
    res.send("WORKING")
});


app.listen(PORT, () => console.log("LISTENING"));


