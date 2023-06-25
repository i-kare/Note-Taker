//1) Packages required by your application 
const express = require('express');  // Import Express.js
const path = require('path'); // Imports Node.js package 'path' to resolve path files 
const fs = require('fs');
const app = express(); // Initiates Express.js
const noteData = require('./db/db.json');
const PORT = 3001; //Identifies which port Express.js server runs =process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid'); // package that will create unique ids per entry

//2) Middleware that have access to req,res, and the next function(s). Middlware executes from top to bottom 
app.use(express.json());//Middleware that parses application.json and urlencoded data
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));//Static middleware pointing to the public folder w/in Develop

//3) Express.js routes 

//A) Get Requests 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
}
);//Default route to homepage, which is index.html

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});//Serving another file, specifically notes.html, from the public directory for notes route

//B)API Routes
app.get('/api/notes', (req, res) => {
    return res.json(noteData)
}); // Returns all saved notes as json

//C)Post request
//Receive new notes and add to the DB, then return that specific note
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Post read failed');
            return;
        }
     
        const newNote = req.body
        newNote["id"] = uuidv4(); // Add a unique id to the new note
        let newArray = JSON.parse(data); // Parse the database and then add the new note to the database
        newArray.push(newNote)
        let stringifiedNotes = JSON.stringify(newArray); // Convert back to a string and write to the database
        fs.writeFile('./db/db.json', stringifiedNotes, 'utf8',(err) => {
            if(err) {
                console.log("Post write failed");
                return;
            }
        });
        return res.json(JSON.stringify(newNote)) // Return the note they requested to get added
    })
});

// Delete request for a specific ID
app.delete('/api/notes/:id', (req,res)=>{
    const id = req.params.id;

    // read the database of notes
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Delete read failed');
            return;
        }

        let notes = JSON.parse(data);
        let newNotes = notes.filter((element) =>{
            return element.id !== String(id);
        }); // remove the note with the same id

        let stringifiedNotes = JSON.stringify(newNotes);
        fs.writeFile('./db/db.json', stringifiedNotes, 'utf8',(err) => {
            if(err) {
                console.log("Delete write failed");
                return;
            }
        }); // write the note with the removed note taken out
        return res.json(newNotes) // return the new notes
    });
}); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});//For any other route that's not defined send homepage, should be at the bottom to catch all routes

//4) Set up server to listen to port 3001
app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);