//Require Mongoose 
const mongoose = require('mongoose')
//define autoIncrement 
const AutoIncrement = require('mongoose-sequence')(mongoose)

//This is related to Mongoose. referring to the other schema created and  say types and say Object ID. not specifically referring to that other schema here, but we're saying what type of data this is. Also I added time stamps.
const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)
//To keep track of of notes, Start seq so we start at 0
noteSchema.plugin(AutoIncrement, {
    inc_field: 'note',
    id: 'noteNums',
    start_seq: 0
})

module.exports = mongoose.model('Note', noteSchema)