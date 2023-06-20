//1) Packages required by your application 
const express = require('express');  // Import Express.js
const path = require('path'); // Imports built-in Node.js package 'path' to resolve path files that are located on the server
//const fs =require('fs');
const PORT = 3001; //Identifies which port Express.js server runs =process.env.PORT || 3001;
const app = express(); // Starts Express.js
//const =require('.Develop/?)

//2) Middleware has access to req,res, and the next function. Middlware executes from top to bottom 
app.use(express.json());//Middleware that parses application.json
//Parsing: Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run
app.use(express.urlencoded({extended:true}));//and urlencoded data
app.use(express.static('./develop/public'));//Static middleware pointing to the public folder w/in Develp(public has: assets w/css, js w/index.js,index.html and notes.html)

//3) Express.js routes
//app.get('/'(res,res) => res.send(''));
app.get('/send', (req, res) =>
    res.sendFile(path.join(__dirname,'./public/index.html'))
);
app.get('',(req, res) =>
    res.sendFile(path.join(__dirname,'./public/notes.html'))
);

//4) Set up server to listen
app.listen(PORT,()=>
console.log('Express server listening on port ${PORT}!')
);