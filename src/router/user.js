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

router.post('/user/logout',auth,async (req,res) => {
    try{
        const user = req.user
        user.token = null
        await user.save()
        res.status(200).send()
    }catch(error){
        console.log(error)
        res.status(500).send({errorMsg: error.message})
    }
})

router.post('/user/login',async (req,res) => {
    try{
        const user = await User.getByCreds(req.body.userName,req.body.password)
        let token = await user.generateToken()
        res.status(200).send({token:token,userName:user.userName,isAdmin:user.isAdmin,voted:user.voted})
    }catch(error){
        console.log(error)
        res.status(401).send({errorMsg: error.message})
    }
})

module.exports = router