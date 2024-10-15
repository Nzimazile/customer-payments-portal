const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const ExpressBrute = require('express-brute');
const db = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const csrfProtection = require('./middleware/csrfMiddleware');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);


const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5, // Allow 5 attempts before blocking
  minWait: 5 * 60 * 1000, // 5 minutes wait after block
  maxWait: 60 * 60 * 1000, // 1 hour maximum wait
});
app.post('/api/auth/login', bruteforce.prevent, authRoutes);


// Middleware
app.use(express.json());
app.use(cors()); // Adjust this for your trusted origins
app.use(helmet()); // Secure HTTP headers
app.use(csrfProtection); // CSRF protection

// Routes
app.use('/api/auth', authRoutes);


// SSL setup (For HTTPS)
const sslOptions = {
  key: fs.readFileSync('path/your/ssl.key'),
  cert: fs.readFileSync('path/your/ssl.cert')
};

app.get('/', function(req, res, next) {
  res.send("Hello world");
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log('Server is running securely on port 443');
});
