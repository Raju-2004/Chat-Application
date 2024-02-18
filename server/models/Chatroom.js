const mongoose = require('mongoose')

const ChatroomSchema = mongoose.Schema({
    Name : {
        type : String,
        required : true
    }
})

const Chat = mongoose.model('room',ChatroomSchema);
module.exports = Chat