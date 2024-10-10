const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Simulate a database with an in-memory array
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' }
];

// GET request - Retrieve list of users
app.get('/users', (req, res) => {
  res.status(200).json(users); 
});

// GET request - Retrieve a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.status(200).json(user); 
  } else {
    res.status(404).send(`User with ID ${userId} not found`);
  }
});

// POST request - Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (!newUser.name) {
    return res.status(400).send('Name is required');
  }
  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1; 
  const user = { id: newId, name: newUser.name };
  users.push(user); 
  res.status(201).json(user); 
});

// PUT request - Update a user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).send(`User with ID ${userId} not found`);
  }

  const updatedUser = req.body;
  if (!updatedUser.name) {
    return res.status(400).send('Name is required');
  }
  
  users[userIndex].name = updatedUser.name; // Update the user's name
  res.status(200).json(users[userIndex]); // Return the updated user
});

// DELETE request - Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).send(`User with ID ${userId} not found`);
  }
  
  users.splice(userIndex, 1); // Remove the user from the array
  res.status(200).send(`User with ID ${userId} deleted`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
