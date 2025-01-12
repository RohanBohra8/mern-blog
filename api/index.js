import express from 'express';
import dotenv from 'dotenv'; // for environment variables
import connectDB from './database/db.js';
import userRoutes from './routes/user.route.js'; //importing test api we created in routes
import authRoutes from './routes/auth.route.js'; //importing auth api we created in routes
import cookieParser from 'cookie-parser';

dotenv.config(); // to use .env file

connectDB(); // connect to database that we created in database.js

const app = express(); // create express app

app.use(express.json()); // to parse json data
app.use(cookieParser());

//listening to the port 3000
app.listen(process.env.PORT || 3000, () =>{
    console.log('server is running on port 3000');
});

//using the api's we created in routes 
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

//middeleware to handle 404 error
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'; 
    res.status(statusCode).json({
        sucess: false,
        statusCode,
        message
    });
}); 