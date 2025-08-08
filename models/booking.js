import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    eventId: {
        type:String,
        required:[true, "eventId is required field"]
    },
    bookingDate: {
        type:Date,
        required:true,
        default: Date.now()
    },
    status: {
        type:Boolean,
        required:false,
        default:true
    }
})

export default mongoose.model("Booking", bookingSchema);