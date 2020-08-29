const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    voted: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.pre('save', async function() {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8) 
    }
})

userSchema.statics.getByCreds = async (userName,password) => {
    const user =await User.findOne({userName:userName})
    console.log(user)
    if(!await bcrypt.compareSync(password,user.password))
    {
        throw new Error('invalid password')
    }
    return user
}
userSchema.methods.generateToken = async function(){
    const user = this
    const token = await jwt.sign({_id: user.userName},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('user',userSchema)

module.exports = User