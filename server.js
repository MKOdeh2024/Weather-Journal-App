const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Routes
app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = req.body;
    res.send(projectData);
});

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});