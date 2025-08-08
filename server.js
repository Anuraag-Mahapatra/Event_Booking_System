import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user_routes.js';
import eventRoutes from './routes/event_routes.js';
import bookingRoutes from './routes/booking_routes.js';
import catchAll from './middlewares/catchAll.js';
import centralErrorHandler from './middlewares/centralErrorHandler.js';

const app = express();

const port = 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost/eventBookingSystem");

app.get("/", (req,res) => {
    res.send("Home Page");
})

app.use("/user", userRoutes);           // User Routes
app.use("/events", eventRoutes);        // Event Routes
app.use("/bookings",bookingRoutes);     // Booking Routes


// Error handler for any undefined routes
app.use(catchAll);
app.use(centralErrorHandler);

app.listen(port, ()=> console.log("Server's Up at http://localhost:3000"));