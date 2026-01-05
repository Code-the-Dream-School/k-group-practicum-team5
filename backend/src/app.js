require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectMongo = require('./config/db.mongo');
const helloRoutes = require('./routes/hello.routes');

// routers
const authRouter = require('../routes/authRouter');

const app = express();

connectMongo().then(() => console.log("MongoDB connected")).catch((err) => console.error("MongoDB connection error:", err));
// connectDB(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// Security & best‑practice middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/hello', helloRoutes);
app.use('/api/user', authRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

module.exports = app;
