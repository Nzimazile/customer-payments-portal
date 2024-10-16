const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const ExpressBrute = require('express-brute');
const db = require('./config/db');
const cors = require('cors');
const csrf = require('csurf');
const authRoutes = require('./routes/authRoutes');
const csrfProtection = require('./middleware/csrfMiddleware');
const cookieParser = require('cookie-parser'); // Parse cookies for CSRF protection

const app = express();

// Load environment variables
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());// Parse cookies for CSRF protectio
// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match frontend domain/port
  credentials: true // Required to allow cookies to be sent from frontend
}));
app.use(helmet());

// CSRF protection middleware
const csrfMiddleware = csrf({
  cookie: true, // Store CSRF tokens in cookies
});
app.use(csrfMiddleware);

// Route to get CSRF token (used by frontend to fetch the token)
app.get('/api/auth/get-csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Rate Limiting Middleware (Basic protection against DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

  // Brute force protection setup
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5, // Allow 5 attempts before blocking
  minWait: 5 * 60 * 1000, // 5 minutes wait after block
  maxWait: 60 * 60 * 1000, // 1 hour maximum wait
});

app.post('/api/auth/login', bruteforce.prevent, authRoutes);

// SSL setup (For HTTPS)
const sslOptions = {
  key: fs.readFileSync('path/your/ssl.key'),
  cert: fs.readFileSync('path/your/ssl.cert')
};

app.use('/api/auth', authRoutes);

// Database connection check
db.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Unable to connect to the database:', err));

  // Global error handling middleware (for handling errors in a centralized way)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log('Server is running securely on port 443');
});
