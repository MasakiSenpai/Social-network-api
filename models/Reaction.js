const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId //is this right?
        },
        reactionBody: {
            type: String,
            required: true,
            //280 max characters
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdTime) => {
                return createdTime
            }
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);