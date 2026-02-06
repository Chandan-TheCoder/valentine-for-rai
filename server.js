// A robust backend using Express.js to handle the proposal response
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow the frontend to communicate with backend
app.use(express.json());

// Database Simulation (using a simple JSON file)
const DB_FILE = path.join(__dirname, 'responses.json');

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// 1. Root Route
app.get('/', (req, res) => {
    res.send("<h1>The Valentine Server is Running... Waiting for Rai.</h1>");
});

// 2. The Proposal Endpoint
app.post('/api/respond', (req, res) => {
    const { person, answer, timestamp } = req.body;

    console.log(`\n-----------------------------------------`);
    console.log(`❤️  INCOMING MESSAGE FROM: ${person}`);
    console.log(`❤️  ANSWER: ${answer}`);
    console.log(`❤️  TIME: ${timestamp}`);
    console.log(`-----------------------------------------\n`);

    if (answer === "YES") {
        console.log("🎉  CONGRATULATIONS! SHE SAID YES!  🎉");
    }

    // Save to file "database"
    const currentData = JSON.parse(fs.readFileSync(DB_FILE));
    currentData.push({ person, answer, timestamp });
    fs.writeFileSync(DB_FILE, JSON.stringify(currentData, null, 2));

    res.json({ success: true, message: "Response recorded forever." });
});

// Start Server
app.listen(PORT, () => {
    console.log(`
    ===================================================
      VALENTINE'S SERVER STARTED ON PORT ${PORT}
    ===================================================
      1. Ensure 'index.html' is open in your browser.
      2. Waiting for the 'YES' button click...
    `);
});