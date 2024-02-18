const User = require('../models/User')
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

router.post('/signup',async(req,res)=>{
    try{
        const {Name , Email , Password} = req.body;
        if(!Name || !Email || !Password)
        {
            return res.status(400).json({message :"Please provide name, email, and password"})
        }
        const ExistingUser = User.findOne({Email})
        /* if(ExistingUser)
        {
            return res.status(400).json({message:"User with this email already Exists"})
        } */
        const HashedPassword = await bcrypt.hash(Password,10)
        const newUser = new User({
            Name : Name ,
            Email : Email,
            Password : HashedPassword
        })
        await newUser.save()
        res.status(201).json({ message: "User created successfully" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {Email,Password} = req.body
        const user = await User.findOne({Email})
        if(!User)
        {
            return res.json(400).json({message:"User not found"})
        }
        const isPasswordMatch = await bcrypt.compare(Password,user.Password)
        if(!isPasswordMatch)
        {
            return res.json(400).json({message : "Invalid Password"})
        }
        jwt.sign({User},process.env.ACCESS_SECRET_TOKEN,{expiresIn:"10m"},(err,token)=>{
            if(err) console.error(err)
            res.status(200).json({message : "login successful",token:token})
        })
    }
    catch(err){
        console.log("Could not Log in")
        res.status(500).json({message : "internal Sever Error"})
    }
})





module.exports = router