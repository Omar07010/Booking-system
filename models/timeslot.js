import mongoose from 'mongoose';
const { Schema } = mongoose;


const timeslotSchema = new Schema({ 
    venueId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true 
    },
    startTime : {
        type: Date,
        default: Date.now()
    },
    endTime : {
        type: Date,
        default: Date.now()
    },
    availability : {
        type: Boolean,
        default: false
    },
    
});

const TimeSlot = mongoose.model('TimeSlot', timeslotSchema);

export default TimeSlot;