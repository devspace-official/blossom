const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DASHBOARD_EMAIL = process.env.DASHBOARD_EMAIL || 'devspace.official@gmail.com';
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'DevSpace@2026';
const SESSION_SECRET = process.env.SESSION_SECRET || 'devspace-secret-key-change-me';
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

function readMessages() {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
    }
  } catch (e) { console.error('Error reading messages:', e); }
  return [];
}

function writeMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
}

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.redirect('/login.html');
}

// API: Save new message
app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  const messages = readMessages();
  const newMsg = {
    id: Date.now(),
    name, email,
    subject: subject || 'No Subject',
    message,
    date: new Date().toISOString(),
    read: false
  };
  messages.push(newMsg);
  writeMessages(messages);
  res.json({ success: true, message: 'Message sent successfully' });
});

// API: Get all messages (auth required)
app.get('/api/messages', requireAuth, (req, res) => {
  res.json(readMessages().reverse());
});

// API: Delete a message
app.delete('/api/messages/:id', requireAuth, (req, res) => {
  const messages = readMessages();
  const filtered = messages.filter(m => m.id !== parseInt(req.params.id));
  writeMessages(filtered);
  res.json({ success: true });
});

// API: Mark as read
app.put('/api/messages/:id/read', requireAuth, (req, res) => {
  const messages = readMessages();
  const msg = messages.find(m => m.id === parseInt(req.params.id));
  if (msg) { msg.read = true; writeMessages(messages); }
  res.json({ success: true });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === DASHBOARD_EMAIL && password === DASHBOARD_PASSWORD) {
    req.session.authenticated = true;
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Invalid email or password' });
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// Check auth status
app.get('/api/auth', (req, res) => {
  res.json({ authenticated: !!(req.session && req.session.authenticated) });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`DevSpace server running at http://localhost:${PORT}`);
});
