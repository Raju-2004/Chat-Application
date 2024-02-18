require("dotenv").config();
const cors = require('cors')
const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const User = require("./models/User");
const Chatroom = require('./models/Chatroom')
const Message = require("./models/Message");

const app = require("./app");

const server = app.listen(4000, () => {
  console.log("listening at port 4000");
});

app.use(cors())

const jwt = require("jsonwebtoken");

const io = require("socket.io")(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    console.log(payload)
    socket.userId = payload.id
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on('connection',(socket)=>{
  console.log("Connected : "+ socket.userId)

  socket.on('disconnect',()=>{
    console.log('Disconnected : '+socket.userId)
  })

  socket.on('joinRoom',({ChatroomId})=>{
    socket.join(ChatroomId)
    console.log('A user joined chatroom:'+ChatroomId)
  })

  socket.on("leaveRoom", ({ ChatroomId }) => {
    socket.leave(ChatroomId);
    console.log("A user left chatroom: " + ChatroomId);
  });

  socket.on("chatroomMessage", async ({ ChatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: ChatroomId,
        user: socket.userId,
        message,
      });
      io.to(ChatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
})