//to seperate the logic of the controller from the routes

import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

//async because we need to wait for some time for the function to fetch results from the database
export const signup = async(req,res,next) => {
    const {username, email, password} = req.body;
    
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    //hashing the password before creating new user
    const hashedPassword = bcryptjs.hashSync(password, 10);
    //creating a new user using the model we created
    const newUser = new User({ username, email, password : hashedPassword});

    //save in the database
    try {
        await newUser.save();
        res.json('SignUp Successfull');
    } catch (error) {
        next(error);
    }
};