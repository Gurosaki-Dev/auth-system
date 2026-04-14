const express = require('express');
const cors = require('cors');

const app = express();

// 🔓 Middleware
app.use(cors());
app.use(express.json());

// 📡 Rotas
app.get('/test', (req, res) => {
  res.json({ message: 'Hello from the auth backend!' });
});

app.post('/login', (req, res) => {
  const { user, password } = req.body;

  if (user === 'admin' && password === '123') {
    return res.json({status: 'Login successful!' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 🚀 Servidor
app.listen(3000, () => {
  console.log('Auth backend server is running on port 3000');
});