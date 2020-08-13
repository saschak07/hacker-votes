const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/user/signUp', async (req,res)=> {
    try{
        const user = new User(req.body)
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({userName: user.userName,token: token})
    }catch(error){
        console.log(error)
        res.status(401).send({errorMsg:error.message})
    }
})

module.exports = router