require("dotenv").config();
const express = require('express')
const app = express()
const cors = require("cors");
const path = require('path')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());





const LoginSingUpRoutes = require('./routes/LoginSignup')
const ChatroomRoutes = require('./routes/Chatroom')

app.use('/',LoginSingUpRoutes)
app.use('/chatrooms',ChatroomRoutes)

app.get('/',(req,res)=>{
    res.send('hii')
})

module.exports = app