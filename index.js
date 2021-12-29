const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

var ebookroute = require('./route/Ebookroute');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({ origin: 'http://localhost:4200' }));

//DB Connection
const uri = process.env.DB;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("DB Connected")
});

app.listen(3000, () => console.log('Server started at port : 3000'));

//use Middleware
app.use('/', ebookroute);