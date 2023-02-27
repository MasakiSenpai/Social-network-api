const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        username: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdTime) => {
                return createdTime
            }
        },
        thoughText: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought',thoughtSchema);

module.exports = Thought;