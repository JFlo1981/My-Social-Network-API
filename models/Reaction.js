const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId ()
        },
        reactionBody: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,          
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)

    },
    {
        toJSON: {
            virtuals: true,

        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function(){
    return this.length
});


const User = model ("User", UserSchema);

model.exports = User;