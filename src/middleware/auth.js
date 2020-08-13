const jwt = require('jsonwebtoken')
const User = require('../models/User')


const auth = async (req,res,next) => {
   try{
        var token_received = req.header('Authorization')
        if(!token_received){
            res.status(401).send({errMsg:'authorization required'})
        }
        token_received = token_received.replace('Basic ','')
        const decoded = await jwt.verify(token_received,process.env.JWT_SECRET)
        const user = await User.findOne({userName: decoded._id})
        console.log(user)
        console.log(token_received)
        const savedToken = user.tokens.filter(instance => instance.token===token_received)
        console.log(savedToken)
        if(!user || savedToken.length===0){
            throw new Error('invalid token inserted')
        }
        req.user = user
        req.token = token_received
        next()

   }catch(error){
       console.log(error)
       res.status(401).send({errorMsg: error.message})
   }
}
module.exports = auth