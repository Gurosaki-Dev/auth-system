const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const pool = require('./db');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/test', (req, res) => {
  res.json({ message: 'Hello from the auth backend!' });
});

app.post('/register', async (req, res) => {
  const { user, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [user, hashedPassword]);
    return res.json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { user, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [user]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userRow = result.rows[0];
    const isMatch = await bcrypt.compare(password, userRow.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {user: user},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      success: true,
      status: 'Login successful!',
      token: token
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.json({ 
      message: 'Access granted to protected route',
      user: decoded.user });
  });
});

//Server
app.listen(3000, () => {
  console.log('Auth backend server is running on port 3000');
});