import express from 'express';
import dotenv from 'dotenv';
import connectDB from './mongoDB/db.js';
import userRouter from './routes/user.js';
import bookingRouter from './routes/booking.js';
import timeslotRouter from './routes/timeslot.js';
import venueRouter from './routes/venue.js';
import authJwt from './auth/jwt.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API = process.env.API_URL;

// الوسائط
app.use(express.json()); // لتحليل application/json
app.use(authJwt());

// المسارات
app.use(`${API}users`, userRouter);
// app.use(userRouter);
app.use(`${API}bookings`, bookingRouter);
app.use(`${API}timeslots`, timeslotRouter);
app.use(`${API}venues`, venueRouter);

// MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
