const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/User')
const movie = require('../models/Movie')
const bcrypt = require("bcrypt")

router.get('/movies', async (req,res)=>{
    try{
        const {name, showtime1, showtime2, orderByid, orderBycreationdate, orderByshowtime} = req.body
        var Themovies = []
    
        // case no filters or searches done
        if(!name){
            // ordering
            // First true boolean has priority
            // case ordering by id
            if(orderByid){
               mov = await movie.find().sort({"id":1})
               Themovies = []
               mov.forEach((item)=>{
               Themovies.push(item)
                })
            }
    
            // case ordering by creation date
            else if(orderBycreationdate){
                mov = await movie.find().sort({"Created At": 1})
                Themovies = []
               mov.forEach((item)=>{
               Themovies.push(item)
                })
            }
    
            // case ordering by showtime date
            else if(orderByshowtime){
                mov = await movie.find().sort({"showtime": 1})
                Themovies = []
               mov.forEach((item)=>{
               Themovies.push(item)
                })
            }
            else{
                mov = await movie.find()
                Themovies = []
               mov.forEach((item)=>{
               Themovies.push(item)
                })
            } 
        }
        else{
    
            // case searching by name
            if(name){
    
                if(orderByid){
                    mov = await movie.find({name: name}).sort({id:1})
                    Themovies = []
                    mov.forEach((item)=>{
                    Themovies.push(item)
                     })
                }
    
                else if(orderBycreationdate){
                    mov = await movie.find({name: name}).sort({"Created At" : 1})
                    Themovies = []
                    mov.forEach((item)=>{
                    Themovies.push(item)
                    })
                }    
    
                else if(orderByshowtime){
                    mov = await movie.find({name: name}).sort({"showtime" : 1})
                    Themovies = []
                    mov.forEach((item)=>{
                    Themovies.push(item)
                        })
                } 
                else{
                    mov = await movie.find({name: name})
                    Themovies = []
                   mov.forEach((item)=>{
                   Themovies.push(item)
                    })
                }  
            }  
        }
            // case filtering by date range
            if(showtime1 && showtime2){
                console.log("dakhal")
                ThemoviesTemp = []
                console.log(Themovies[0])
                Themovies.forEach((item) =>{
                    if(item.showtime.getTime() >= new Date(showtime2).getTime() && item.showtime.getTime() <= new Date(showtime1).getTime())
                        ThemoviesTemp.push(item)
                })
                Themovies = ThemoviesTemp
            }
    
            // case only one date is entered
            else if((showtime1 && !showtime2) || (!showtime1 && showtime2)){
                res.status(401).send({msg:"Please Enter The date range correctly"})
            }   
        return res.json(Themovies)
    }catch(err){
        res.status(500).json({ error: err.message });
    }
     
})

router.get('/movies/page=:pageID', async (req,res)=>{
    try{
        const {name, showtime1, showtime2, orderByid, orderBycreationdate, orderByshowtime} = req.body
        var Themovies
        const pageID = parseInt(req.params.pageID) || 1
        if(pageID<=0){
            pageID = 1
            res.status(401).send({msg: "Please enter a valid page number"})
        } 
    
        // case no filters or searches done
        if(!name){
            
            // ordering
            // First true boolean has priority
            // case ordering by id
            if(orderByid){
               mov = await movie.find().sort({"id":1}).skip((parseInt(pageID)-1)*5).limit(5)
               Themovies = []
               mov.forEach((item)=>{
               Themovies.push(item)
                })
            }
    
            // case ordering by creation date
            else if(orderBycreationdate){
                mov = await movie.find().sort({"Created At": 1}).skip((parseInt(pageID)-1)*5).limit(5)
                Themovies = []
               mov.forEach((item)=>{
               Themovies.push(item)
                })
            }
    
            // case ordering by showtime date
            else if(orderByshowtime){
                mov = await movie.find().sort({"showtime": 1}).skip((parseInt(pageID)-1)*5).limit(5)
                Themovies = []
               mov.forEach((item)=>{
               Themovies.push(item)
                })
            }
            else{
                mov = await movie.find().skip((parseInt(pageID)-1)*5).limit(5)
                Themovies = []
               mov.forEach((item)=>{
               Themovies.push(item)
                })
            } 
    
        }  
        else{
    
            // case searching by name
            if(name){
    
                if(orderByid){
                    mov = await movie.find({name: name}).sort({id:1}).skip((parseInt(pageID)-1)*5).limit(5)
                    Themovies = []
                    mov.forEach((item)=>{
                    Themovies.push(item)
                     })
                }
    
                if(orderBycreationdate){
                    mov = await movie.find({name: name}).sort({"Created At" : 1}).skip((parseInt(pageID)-1)*5).limit(5)
                    Themovies = []
                    mov.forEach((item)=>{
                    Themovies.push(item)
                    })
                }    
    
                if(orderByshowtime){
                    mov = await movie.find({name: name}).sort({"showtime" : 1}).skip((parseInt(pageID)-1)*5).limit(5)
                    Themovies = []
                    mov.forEach((item)=>{
                    Themovies.push(item)
                        })
                }
                else{
                    mov = await movie.find({name: name}).skip((parseInt(pageID)-1)*5).limit(5)
                    Themovies = []
                   mov.forEach((item)=>{
                   Themovies.push(item)
                    })
                }   
            }  
        }
            // case filtering by date range
            if(showtime1 && showtime2){
                console.log("dakhal")
                ThemoviesTemp = []
                console.log(Themovies[0])
                Themovies.forEach((item) =>{
                    if(item.showtime.getTime() >= new Date(showtime2).getTime() && item.showtime.getTime() <= new Date(showtime1).getTime())
                        ThemoviesTemp.push(item)
                })
                Themovies = ThemoviesTemp
            }
    
            // case only one date is entered
            else if((showtime1 && !showtime2) || (!showtime1 && showtime2)){
                res.status(401).send({msg:"Please Enter The date range correctly"})
            }
    
            return res.json(Themovies)
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})




module.exports = router;