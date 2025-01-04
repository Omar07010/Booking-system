import mongoose from 'mongoose';
const { Schema } = mongoose;


const bookingSchema = new Schema({ 
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    venueId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    timeslotId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSlot',
        required: true
    },
    date : {
        type: Date,
        default: Date.now()
    },
    status : {
        type: String,
        default: '',            
    }
});


const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;