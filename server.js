const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get('/api/notes', (req, res) => {
    const notesData = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(notesData);
  });

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
  
    const notesData = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    notesData.push(newNote);
  
    fs.writeFileSync('db/db.json', JSON.stringify(notesData));
  
    res.json(newNote);
  });

  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });