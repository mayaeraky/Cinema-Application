const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const user = require('../models/User')
const movie = require('../models/Movie');
const User = require('../models/User');
const { route } = require('./UserRoutes');


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





// Adding Moderators
router.post('/CreateModerator' , authenticateToken ,async (req, res, next) =>{
    try{
       // const ad = await user.findOne({ "_id": req.user.id });
        if(req.user.role != "Admin")  res.status(401).send({ msg: 'Access Denied' });
        
        else{
        const {name, salary, email, gender, username, password} = req.body
        if(!name || !salary || !email || !gender || !username)
            return res.status(401).send({msg: "Please Fill all the required fields"})
        else{
            const mod = await user.findOne({username: username})
            if(mod != null) return res.status(401).send({msg: "A user with this username already exists"})
            else{
                const salt = await bcrypt.genSalt(10);
                if(!password){
                    hashedPassword = await bcrypt.hash("123456", salt);
                }
                else {
                    hashedPassword = await bcrypt.hash(password, salt);
                }
                const toAdd = await new User({name, type: "Moderator", salary, email, gender, username, "password": hashedPassword})
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

// Adding Admins
router.post('/CreateAdmin' , authenticateToken, async (req, res) =>{
    try{
        const ad = await user.findOne({ "_id": req.user.id });
        if(req.user.role != "Admin")  res.status(401).send({ msg: 'Access Denied' });
        
        else{
        const {name, salary, email, gender, username, password} = req.body
        if(!name || !salary || !email || !gender || !username){
            console.log(req.body)
            return res.status(401).send({msg: "Please Fill all the required fields"})}
        else{
            const mod = await user.findOne({username: username})
            if(mod != null) return res.status(401).send({msg: "A user with this username already exists"})
            else{
                const salt = await bcrypt.genSalt(10);
                if(!password){
                    hashedPassword = await bcrypt.hash("123456", salt);
                }
                else {
                    hashedPassword = await bcrypt.hash(password, salt);
                }
                const toAdd = await new User({name, type: "Admin", salary, email, gender, username, "password": hashedPassword})
                await toAdd.save()
                res.send({msg: "Done"})
               // console.log(toAdd)
                
            }
        }
    }
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})


// list Moderators
router.get('/ListModerators' , authenticateToken, async (req,res) => {
    try{
    const ad = await user.findOne({ "_id": req.user.id });
    if(req.user.role != "Admin")  res.status(401).send({ msg: 'Access Denied' });
    
    else{
    const mod = await user.find({"type": "Moderator"})
    const moderators = []
    mod.forEach((item)=>{ moderators.push(item)})
    console.log("done")
    return res.json(moderators)
    }
}
catch(err){
    res.status(500).json({ error: err.message });
}})

module.exports = router;