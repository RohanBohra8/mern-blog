//to seperate the logic of the controller from the routes

import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async(req,res,next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
           return next(errorHandler(400, 'Invalid Email or User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
           return next(errorHandler(400, 'Invalid Password'));
        }
        //now if both email and password are correct, we can send a token to the user 
        const token = jwt.sign(
            {id: validUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        const {password: pass, ...rest} = validUser._doc; //seperates password from the user object

        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
    } catch (error) {
        next(error);
    }
};