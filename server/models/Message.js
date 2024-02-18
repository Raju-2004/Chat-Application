const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    chatroom : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'room'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    },
    message : {
        type : String,
        required : true
    }
})

const Message = mongoose.model('messages',MessageSchema);
module.exports = Message