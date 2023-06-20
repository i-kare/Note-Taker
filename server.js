//1) Packages required by your application 
const express = require('express');  // Import Express.js
const path = require('path'); // Imports Node.js package 'path' to resolve path files 
//const fs =require('fs');
const app = express(); // Initiates Express.js
//const =require('.Develop/db)
const PORT = 3001; //Identifies which port Express.js server runs =process.env.PORT || 3001;


//2) Middleware that have access to req,res, and the next function(s). Middlware executes from top to bottom 
app.use(express.json());//Middleware that parses application.json and urlencoded data
app.use(express.urlencoded({extended:true}));
app.use(express.static('./Develop/public'));//Static middleware pointing to the public folder w/in Develop

//3) Express.js routes || Get Requests || API Routes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname,'./Develop/public/index.html'))
);//Default route back to homepage
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname,'./Develop/public/notes.html'))
);//Serving another file, specifically notes.html, from the public directory
app.get('/index', (req, res) => 
    res.sendFile(path.join(__dirname,'./Develop/public/index.html'))
);//Serving another file,specifically index.html, from the public directory

//4) Set up server to listen
app.listen(PORT,()=>
console.log('Express server listening on port ${PORT}!')
);