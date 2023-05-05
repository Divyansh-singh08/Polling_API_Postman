// IMPORT the setup modules
require('dotenv').config();//configure the dotenv file
const express = require('express');//importing the express for making API endpoints and making HTTP req

const { PORT,SESSION_SECRET } = process.env;
const db = require('./configs/mongoose');
const session = require('express-session');
const app = express();//creating the express app from here


//////Using the middleware from here

app.use(express.json());//using this is to parse json

app.use(session({
    name:'Polling-System',
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookies:{
        maxAge:3600000, //session expire in 1 hr
    },
}));


//using question controller with endpoint /questions
///api/v1/questions/create
app.use('/api/v1/questions',require('./routes/api/v1/question_route'));
// using option controller with endpoint /options
app.use('/api/v1/options',require('./routes/api/v1/option_route'));


//Listening  server here
app.listen(PORT,()=>{
    console.log(`Server running successfully on http://localhost:${PORT}`);
});