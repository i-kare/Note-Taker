//1) Packages required by your application 
const express = require('express');  // Import Express.js
const path = require('path'); // Imports Node.js package 'path' to resolve path files 
const fs = require('fs');
const app = express(); // Initiates Express.js
const noteData = require('./db/db.json');
const PORT = 3001; //Identifies which port Express.js server runs =process.env.PORT || 3001;


//2) Middleware that have access to req,res, and the next function(s). Middlware executes from top to bottom 
app.use(express.json());//Middleware that parses application.json and urlencoded data
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));//Static middleware pointing to the public folder w/in Develop

//3) Express.js routes 

//A) Get Requests 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
}
);//Default route to homepage
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});//Serving another file, specifically notes.html, from the public directory for notes route

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'))
// });//For any other route that's not defined send homepage

//B)API Routes
app.get('api/notes', (req, res) => {
    console.log(req)
    res.json(noteData)
});


//C)Post request
//Receive new notes and add to the DB, then return those notes
app.post('api/notes', (req, res) => {
    fs.readFile(everyNotePath, 'utf-8', (err, data) => {
        if (err) {
            console.log('Post failed')
            return;
        }

        let notes = JSON.parse(data);
        console.log(notes);
    })
});

//4) Set up server to listen
app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);