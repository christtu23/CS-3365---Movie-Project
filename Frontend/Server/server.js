const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Movie Booking System API' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});