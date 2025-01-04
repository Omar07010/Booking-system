import mongoose from 'mongoose';
const { Schema } = mongoose;


const venueSchema = new Schema({ 
    name : {
        type: String,
        require: true
    },
    location : {
        type: String,
        require: true
    },
    capacity : {
        type: Number,
        require: true
    },
    description : {
        type: String,
        default: ''
    },
    availability : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSlot',
        required: true     
    }
})

const Venue = mongoose.model('Venue', venueSchema);

export default Venue;