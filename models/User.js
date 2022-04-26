const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true
            
        },
        thoughts: {

        },
        friends: {

        }

    }
);

UserSchema.virtual('friendCount')