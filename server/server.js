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



const { default: mongoose } = require("mongoose");

mongoose.connect(
  process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const LoginSingUpRoutes = require('./routes/LoginSignup')
const ChatroomRoutes = require('./routes/Chatroom')

app.use('/',LoginSingUpRoutes)
app.use('/chatroom',ChatroomRoutes)

app.get('/',(req,res)=>{
    res.send('hii')
})



app.listen(4000,()=>{
    console.log('listening at port 4000');
})