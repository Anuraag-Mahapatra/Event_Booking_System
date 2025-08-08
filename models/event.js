import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Name is a required field"]
    },
    date: {
        type:Date,
        required:[true, "Date is a required field"],
        default:Date.now()
    },
    location: {
        type:String,
        required:[true, "Location is a required field"]
    },
    capacity: {
        type:Number,
        required:[true, "Capacity is a required field"],
        default:0
    }
})

export default mongoose.model("Event", eventSchema); 