const express = require('express');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');
const sequelize = require('./db');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('views')); // Serve static files from the views directory

// Serve index.html at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/notes', notesRouter); // Use notes routes

// Sync the database and start the server
sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

