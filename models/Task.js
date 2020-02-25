const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    isActive: {type:Boolean, default: false},
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('task', taskSchema) 