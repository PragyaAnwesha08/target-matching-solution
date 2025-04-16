const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());

const companies = [
  { id: 1, companyName: 'TechCorp', matchScore: 86, accountStatus: 'Target' },
  { id: 2, companyName: 'BizCo', matchScore: 56, accountStatus: 'Not Target' },
  { id: 3, companyName: 'WebSoft', matchScore: 73, accountStatus: 'Target' },
];

const users = [
  { username: 'user1', password: 'pass123' },
];

const JWT_SECRET = 'your-jwt-secret-key';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

app.get('/accounts', authenticateToken, (req, res) => {
  res.json(companies);
});

app.post('/accounts/:id/status', authenticateToken, (req, res) => {
  const companyId = parseInt(req.params.id);
  const { status } = req.body;
  const company = companies.find((comp) => comp.id === companyId);
  if (!company) {
    return res.status(404).json({ message: 'Company not found' });
  }
  company.accountStatus = status;
  res.json({ message: 'Company status updated', company });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

