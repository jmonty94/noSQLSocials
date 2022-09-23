const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        tim: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});


module.exports = model('User', userSchema);