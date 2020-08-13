const Hacker = require('../models/Hackers')
const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/hackers',auth, async (req,res)=> {
    try{
        const hackers = await Hacker.find()
        if(!hackers){
            res.status(500).send({errMsg: 'nodetails found'})
        } 

        res.status(200).send(hackers)
    }catch(error){
        console.log(error)
        res.status(500).send({errMsg:error.message})
    }
})

router.post('/hackers',auth, async (req,res)=> {
    try{
        const user = req.user
        if(user.isAdmin){
            const hacker = new Hacker(req.body)
            await hacker.save()
            res.status(200).send(hacker)
        }
        res.status(401).send({errMsg:'need to be an admin'})
    }catch(error){
        console.log(error)
        res.status(500).send({errMsg:error.message})
    }
})

router.put('/hackers/:name',auth, async(req,res)=>{
    try{
        const hacker = await Hacker.findOne({name:req.params.name})
        const updateFields = Object.keys(req.body)
        if(!req.user.isAdmin){
            res.status(400).send({errMsg:'need admin rights to modify records'})
        }
        if(!hacker){
            res.status(500).send({errMsg:'no details found!'})
        }
        updateFields.forEach(field => hacker[field]=req.body[field])
        await hacker.save()
        res.status(200).send(hacker)

    }catch(error){
        res.status(500).send({errMsg:error.message})
    }
})

router.put('/hackers/vote/:id',auth, async(req,res)=>{
    try{
        const user = req.user
        if(user.voted){
            res.status(500).send({errMsg:'voting already done by you'})
            return
        }
        const hacker = await Hacker.findById(req.params.id)
        hacker.votes = hacker.votes+1
        user.voted = true
        await user.save()
        await hacker.save()
        res.status(200).send(hacker)
    }catch(error){
        res.status(500).send({errMsg:error.message})
    }
})

module.exports = router