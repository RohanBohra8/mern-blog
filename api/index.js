import express from 'express';

const app = express(); // create express app

//listening to the port 3000
app.listen(300, () =>{
    console.log('server is running on port 3000');
});