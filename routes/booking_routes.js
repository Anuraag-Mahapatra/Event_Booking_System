import express from 'express';
import Booking from '../models/booking.js';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';
import Event from '../models/event.js'

const router = express.Router();


// GET User's bookings
router.get("/myBookings", authenticate, async (req,res) => {
    const userId = req.user.id;

    try {
        const bookings = await Booking.find({userId:userId});
        if (!bookings) {
            return res.status(404).json({error:"No bookings found"});
        }
        return res.status(200).json(bookings);
    } catch (e) {
        return res.status(400).json({error:e.message});
    }
})


// Create a booking
router.post("/", authenticate, async (req,res) => {
    const userId = req.user.id;
    const {eventId} = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({error:"Event not found"});
        }
    
        const bookingCount = await Booking.countDocuments({eventId, status:true});
        if(bookingCount >= event.capacity) {
            return res.status(400).json({message:"Event is fully booked!!"});
        }
    
        const existingBooking = await Booking.findOne({userId,eventId,status:true});
        if(existingBooking) {
            return res.status(400).json({message:"Already booked for ur ID....."});
        }

        const booking = await Booking.create({userId,eventId,bookingDate:event.date});
    } catch (e) {
        res.status(400).json({error:e.message});
    }

    res.status(201).json({message:"Event booked successfully"});
})


// GET all bookings (admin only)
router.get("/allBookings", authenticate, authorize("admin"), async (req,res) => {
    try {
        const bookings = await Booking.find({}, {__v:0});
        if(!bookings) {
            return res.status(400).json({message:"No bookings found"})
        }
        res.status(200).json(bookings)
    } catch (e) {
        return res.status(400).json({error:e.message});
    }
})

export default router;