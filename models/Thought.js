const { Schema, model } = require("mongoose");
const ObjectId = require('mongodb').ObjectId

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formattedTimestamp,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);


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
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

function formattedTimestamp(createdAt){
    const date = createdAt.toLocaleDateString([], { dateStyle: 'long'});
    const time = createdAt.toLocaleTimeString([], { timeStyle: 'long'});
    return `${date} at ${time}`;
};


module.exports = model('Thought', thoughtsSchema);