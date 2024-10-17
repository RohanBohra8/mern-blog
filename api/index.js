import express from 'express';
import dotenv from 'dotenv'; // for environment variables
import connectDB from './database/db.js';
import userRoutes from './routes/user.route.js'; //importing test api we created in routes

dotenv.config(); // to use .env file

connectDB(); // connect to database that we created in database.js

const app = express(); // create express app


//listening to the port 3000
app.listen(process.env.PORT || 3000, () =>{
    console.log('server is running on port 3000');
});

//using the api's we created in routes 
app.use('/api/user', userRoutes);