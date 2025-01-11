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
    ProfilePicture:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
}, {timestamps: true}); // Adding timestamp to the schema for time of creation and time of updation of the user

//creating model for our schema
const User = mongoose.model('User', userSchema);

export default User;