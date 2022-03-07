'use strict';
const express = require ('express');
const { user } = require('../models/index.js');
const routers = express.Router();
const basicAuth = require('../middleware/basicAuth');
const bcrypt = require('bcrypt');






routers.post('/signin',basicAuth,(req,res)=>{

    res.status(200).json(req.userName);
})


routers.post('/signup', async (req, res, next) => {
    let { username, password } = req.body;
    try {
        
        let hashedPassword = await bcrypt.hash(password,5)
        const newUser = await user.create({
            username : username,
            password : hashedPassword
        }
        );
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        next('invalid signUp');
    }
});

module.exports = routers;