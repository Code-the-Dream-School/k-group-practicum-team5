require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectMongo = require('./config/db.mongo');
const uploadRoutes = require('./routes/upload.routes');
const helloRoutes = require('./routes/hello.routes');
const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRouter');
const adminRoutes = require('./routes/adminRouter');
const contactInfoRoutes = require('./routes/contactInfo.routes')
const volunteeringRoutes = require('./routes/volunteering.routes');
const volunteeringScheduleRoutes = require('./routes/volunteeringSchedule.routes');
const businessHoursRoutes = require('./routes/businessHours.routes')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const contactRoutes = require('./routes/contactMessage.routes');

const app = express();
const dotenv = require('dotenv');
dotenv.config();

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
app.use('/api/v1/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/v1/images', uploadRoutes);
app.use("/api/v1/contact-info", contactInfoRoutes)
app.use('/api/v1/volunteering', volunteeringRoutes);
app.use('/api/v1/business-hours', businessHoursRoutes)
app.use('/api/v1/volunteeringSchedule', volunteeringScheduleRoutes);

app.use('/api/v1/contact-messages', contactRoutes)
// Root route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
