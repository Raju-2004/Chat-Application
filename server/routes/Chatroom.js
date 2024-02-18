const Chatroom = require('../models/Chatroom')
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const auth = require('../middlewares/auth')
const Message = require('../models/Message')

router.post('/', auth, async (req, res) => {
    try {
        const { Name } = req.body;

        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(Name)) {
            return res.status(400).json({ message: "Chatroom name can contain only alphabets." });
        }

        const chatroomExists = await Chatroom.findOne({ Name });

        if (chatroomExists) {
            return res.status(400).json({ message: "Chatroom with that name already exists!" });
        }

        const chatroom = new Chatroom({
            Name,
        });

        await chatroom.save();

        res.json({
            message: "Chatroom created!",
        });
    } catch (err) {
        console.error("Error creating chatroom:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/',auth,async(req,res)=>{
    console.log('get chatroom called')
    const chatrooms = await Chatroom.find();
    res.json(chatrooms);
})

// router.get('/:id/message',auth,async(req,res)=>{
//     const messages = await Message.find();
//     res.json(messages);
// })


module.exports = router