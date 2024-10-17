import mongoose from 'mongoose';

// Defining the user schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
}, {timestamp: true}); // Adding timestamp to the schema for time of creation and time of updation of the user

//creating model for our schema
const User = mongoose.model('User', userSchema);

export default User;