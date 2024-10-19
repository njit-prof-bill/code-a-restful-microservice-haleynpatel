const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

let users = [];
let nextId = 1; // ID counter 

// 1. POST /users: Create New User
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    const newUser = {
        id: nextId++,  // Assign user ID
        name,
        email
    };
    users.push(newUser);  // Add user to array
    res.status(201).json(newUser); 
});

// 2. GET /users/:id: Retrieve user info 
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user); 
});

// 3. PUT /users/:id: Update user information
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }
    users[userIndex] = {
        id: userId,
        name,
        email
    };
    res.json(users[userIndex]);
});

// 4. DELETE /users/:id: Delete a user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }
    users.splice(userIndex, 1);
    res.status(204).send(); 
});
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing