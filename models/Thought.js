const { Schema,  } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {

        },
        createdAt: {

        },
        username: {

        },
        reactions: {

        }
    }
)

ThoughtSchema.virtual('reactionCount')