const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/User')
const movie = require('../models/Movie')
const bcrypt = require("bcrypt")


//login
router.post("/login", async (req, res, next) => {
    console.log("here in login");
    try {
        const { username, password } = req.body;
        if (!username) {
            res.status(400).send({ msg: "The username and password you entered did not match our records. Please double-check and try again." });
            return;
        }
        if (!password) {
            res.status(400).send({ msg: "The username and password you entered did not match our records. Please double-check and try again." });
            return;
        }
        const existingUser = await user.findOne({ username: username });
        if (!existingUser) {
            res.status(400).send({ msg: "Looks like you are not registered. Sign up?" });
            return;
        } else {
            console.log(password)
            const isMatched = await bcrypt.compare(password, existingUser.password);
            if (isMatched === false) {
                res.status(400).send({ msg: "The username and password you entered did not match our records. Please double-check and try again." });
                return;
            } else {
                const token = await jwt.sign(
                    {
                        id: existingUser._id,
                        role: existingUser.type,
                    },
                    process.env.TOKEN_SECRET
                );

                const user = {
                    objectId: existingUser._id,
                    role: existingUser.type,
                    name: existingUser.name,
                    salary: existingUser.salary,
                    email: existingUser.email,
                    gender: existingUser.gender
                };
                res.header("auth-token", token).status(200).send({ user });
                return;
            } 
        }
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
});


