const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const app = express();
const port = 3000;
const secret = 'your_secret_key';

// middleware to check for a valid JWT token
app.use(expressJwt({ secret }).unless({ path: ['/login'] }));

// route to generate a new JWT token
app.post('/login', (req, res) => {
  const user = { id: 1, name: 'John Doe' };
  const token = jwt.sign(user, secret);
  res.json({ token });
});

// protected route that requires a valid JWT token
app.get('/protected', (req, res) => {
  const user = req.user;
  res.json({ message: `Hello, ${user.name}!` });
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
