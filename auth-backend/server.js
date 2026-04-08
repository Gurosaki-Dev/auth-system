const express = require('express');
const app = express();

app.use(express.json());

// 🔓 Middleware (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// 📡 Rotas
app.get('/test', (req, res) => {
  res.json({ message: 'Hello from the auth backend!' });
});

app.post('/login', (req, res) => {
  const { user, password } = req.body;
  
  console.log (user, password)
  res.json({ message: `Login attempt for user: ${user}` });
});


// 🚀 Servidor
app.listen(3000, () => {
  console.log('Auth backend server is running on port 3000');
});