const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/User')
const movie = require('../models/Movie')
const bcrypt = require("bcrypt");
const { db } = require('../models/User');



// var multer = require('multer');
// var imgModel = require('../models/image');
// const fs = require('fs')
// var path = require('path');

async function authenticateToken(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        res.status(401).send({ msg: "Access deined please log in first." });
        return;
    }
    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ msg: "Invalid Request." });
        return;
    }
}


//login
router.post("/login", async (req, res, next) => {
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
        const existingUser = await user.findOne({ "username": username });
        if (!existingUser) {
            res.status(400).send({ msg: "Looks like you are not registered. Sign up?" });
            return;
        } else {
            console.log(existingUser)
            console.log(password)
            console.log(existingUser.password == password)
            console.log(await bcrypt.compare(password,existingUser.password))
            const isMatched = await bcrypt.compare(password, existingUser.password);
            if (isMatched == false) {
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
            } 
        }
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
});



// Adding Movie
router.post('/CreateMovie' , authenticateToken, async (req, res, next) =>{
    try{
        if(req.user == null)  res.status(401).send({ msg: 'Access Denied' });
        
        else{
        const {name, showtime, duration_in_minutes, pictureID, description} = req.body
        // add ()
        if(!name || !showtime || !pictureID || !duration_in_minutes)
            return res.status(401).send({msg: "Please Fill all the required fields"})
        else{
            const mod = await movie.findOne({name: name})
            if(mod != null) return res.status(401).send({msg: "A movie with this name already exists"})
            else{
                var toAdd
                // console.log(movie.countDocuments())
                const id = await movie.countDocuments()
                if(!description){
                    // add , pictureID
                    toAdd = await new movie({name,"id": (id+1), showtime , duration_in_minutes,pictureID, "addedby": req.user.id})
                }
                // add pictureID
                toAdd = await new movie({name, "id": (id+1), showtime, duration_in_minutes, pictureID, description, "addedby": req.user.id})
                await toAdd.save()
                res.send({msg: "Done"})
                console.log(toAdd)
                
            }
        }
    }
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})


const upload = require("../middleware/upload");


router.post("/upload", authenticateToken, upload.single("file"), async (req, res) => {
    console.log("ahu")
    try{
        if(req.user == null)  res.status(401).send({ msg: 'Access Denied' });
        
        else{
            const file = req.file
            if (req.file === undefined) return res.send("you must select a file.");
            const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
            return res.send(imgUrl);
        }
    }catch(err){
        res.status(500).json({ error: err.message });
    } 
});




module.exports = router;