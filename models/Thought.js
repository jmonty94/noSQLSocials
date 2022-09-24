const { Schema, model } = require("mongoose");

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
        required: true,
    },
    // todo build reaction schema and add timestamp getter method
})


module.exports = model('thoughts', thoughtsSchema)