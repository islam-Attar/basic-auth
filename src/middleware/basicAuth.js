'use strict'
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { user } = require('../models/index');

const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let headerParams = req.headers.authorization.split(' ');
            let encoded = headerParams.pop();
            let decoded = base64.decode(encoded);
            let [username, password] = decoded.split(':');

            const userName = await user.findOne({ where: { username: username } });
            const pwd = await bcrypt.compare(password, userName.password);
            if (pwd) {
                req.userName = userName
                next();
            } else {
                next('invalid Login')
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }

}

module.exports = basicAuth;