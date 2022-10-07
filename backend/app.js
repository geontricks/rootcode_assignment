const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//app.use(express.urlencoded({extended:false}))

const port = 3000;

const mongoUel = "mongodb://localhost:27017/rootcode2"

mongoose.connect(mongoUel,{})

const db = mongoose.connection;

db.once("open", () => {
    console.log("Database Connected Successful!")
});

const postrouter = require("./routes/PostRouter")
const commentrouter = require('./routes/CommentRouter');

app.use('/post', postrouter)
app.use('/comment', commentrouter)

app.listen(port, () => {
    console.log("Application Running Started!")
})