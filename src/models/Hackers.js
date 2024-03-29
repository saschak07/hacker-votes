const mongoose = require('mongoose')

const hackerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    noOfChanllenges: {
        type: Number,
        default: 0
    },
    expertiseLevel: {
        type: Number,
        default: 0
    },
    photo:{
        type: Buffer
    },
    expertIn: {
        dataStructure : {
            type: Number,
            default: 0,
        },
        algorithm :{
            type: Number,
            default: 0
        },
        cplusplus:{
            type: Number,
            default: 0
        },
        java:{
            type: Number,
            default: 0
        },
        python:{
            type: Number,
            default: 0
        } 
    },

    votes: {
        type: Number,
        default: 0
    }


})

hackerSchema.methods.toJSON = function() {
    const hacker = this
    const hackerObject = hacker.toObject()
    delete hackerObject.photo
    return hackerObject 
}

const Hacker = mongoose.model('hacker',hackerSchema)

module.exports = Hacker