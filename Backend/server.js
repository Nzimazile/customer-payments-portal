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

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match frontend domain/port
  credentials: true // Required to allow cookies to be sent from frontend
}));

// Initialize Express
const app = express();
// Helmet Middleware (Security headers)

// Rate Limiting Middleware (Basic protection against DDoS)
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
app.use(express.json());
app.use(helmet());



app.post('/api/auth/login',csrfProtection, bruteforce.prevent, authRoutes);
app.post('/api/auth/register', csrfProtection, authRoutes);


// Middleware

app.use(cookieParser()); // Parse cookies for CSRF protection
app.use(csrfProtection); // Apply CSRF protection

// CORS Middleware
app.use(cors()); 

// Custom CORS Headers (for fine-grained control)
app.use((reg,res,next)=>
{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','*');
  res.setHeader('Access-Control-Allow-Methods','*');

})

// Routes
app.use('/api/auth', authRoutes);


// SSL setup (For HTTPS)
const sslOptions = {
  key: fs.readFileSync('path/your/ssl.key'),
  cert: fs.readFileSync('path/your/ssl.cert')
};


app.get('/', function(req, res, next) {
  res.send("Security Is working");
});

// Database connection check
db.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Unable to connect to the database:', err));

  // Global error handling middleware (Optional, for handling errors in a centralized way)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log('Server is running securely on port 443');
});
