const mongoose = require('mongoose')

const VoteSchema = mongoose.Schema({

}, {
    timestamps: true
})

const Vote = mongoose.model('vote', VoteSchema)

const vote = () =>{ 
    
}