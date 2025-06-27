const express = require('express');
const routes = require('./routes.js');
const mongoose=require('mongoose');
const app = express();

app.use(express.json());


app.use('/listing',routes);

mongoose.connect('mongo_uri').then(()=>{
    console.log('Mongo connected');
    app.listen(5000,()=>{
        console.log("App litening on port 5000")
    })
})