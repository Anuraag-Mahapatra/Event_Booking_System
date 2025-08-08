import express from 'express';
import Event from '../models/event.js';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();


// GET all events (public route)
router.get("/", async (req,res) => {
    try {
        const event = await Event.find({}, {__v:0});
        return res.status(200).json(event);
    } catch (e) {
        return res.status(400).json({error:e.message});
    }
})


// Create a new Event (admin only)
router.post("/add", authenticate, authorize("admin"), async (req,res) => {
    const {name,date,location,capacity} = req.body;

    try {
        const event = await Event.create({name,date,location,capacity});
    } catch (e) {
        return res.status(400).json({error:e.message});
    }

    res.status(201).json({message:"Event created successfully"});
})


// Delete an event from the DB (admin only)
router.delete("/delete/:id", authenticate, authorize("admin"), async (req,res) => {
    const id = req.params.id;
    try {
        const event = await Event.deleteOne({_id:id});
    } catch (e) {
        return res.status(400).json({error:e.message});
    }

    res.status(200).json({message:"Event deleted successfully"})
})


// Update an event's fields (admin only)
router.put("/update/:id", authenticate, authorize("admin"), async (req,res) => {
    const id = req.params.id;
    const allowedUpdates = ["name", "date", "location", "capacity"];
    const updates = {};
    allowedUpdates.forEach(field => {
        if(req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    })
    try {
        const event = await Event.findByIdAndUpdate(id,{$set:updates}, {new:true, runValidators:true});
    } catch (e) {
        return res.status(400).json({error:e.message});
    }

    res.status(200).json({message:"Event updated successfully"})
})

export default router;