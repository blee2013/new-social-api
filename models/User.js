const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'A username is required',
        trimmed: true
    },
    email: {
        type: String,
        required: 'An email is required',
        unique: true,
        match: [/.+@.+\..+/, 'Enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ],
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of friens on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
    // this.friends.reduce((total, friend) => total + friend.replies.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;