const  mongoose  = require("mongoose");

const noteSchema = mongoose.Schema({
    title:{type:String},
    info:{type:String},
    author:{type:String},
    user:{type:String}
})

const NoteModel = mongoose.model('note',noteSchema)

module.exports = {NoteModel}