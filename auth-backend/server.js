const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/test', (req, res) => {
  res.json({ message: 'Hello from the auth backend!' });
});

app.post('/login', (req, res) => {
  const { user, password } = req.body;

  if (user === 'admin' && password === '123') {
    const token = jwt.sign(
      {user: user},
      'minha_chave_secreta',
      { expiresIn: '1h' }
    )
    return res.json({
      success: true,
      status: 'Login successful!',
      token: token
    });
  } else {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid credentials' 
    });
  }
});

app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'minha_chave_secreta', (err, decoded) => {
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