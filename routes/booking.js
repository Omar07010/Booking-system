import express from 'express';
import Booking from '../models/booking.js';
import User from '../models/user.js';
import Venue from '../models/venue.js';
import TimeSlot from '../models/timeslot.js';
import dotenv, { populate } from 'dotenv';

dotenv.config();
const router = express.Router();

// GET Methods
router.get ('/', async (req, res) => {
    try{
        const getBookings = await Booking.find()
        .populate('userId')
        .populate({ 
            path: 'venueId',
            populate: 'availability'
        })
        .populate(
            { 
                path: 'timeslotId', 
                populate: 'venueId'
            });
        res.status(201).json(getBookings);
    }
    catch(err){
        console.error(err); 
        res.status(500).json('Booking Not Found!');
    }
})
router.get ('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const getBooking = await Booking.findById(id);
        res.status(201).json(getBooking);
    }
    catch(err){
        console.error(err); 
        res.status(500).json('Users Not Found!');
    }
})

// POST Methods
router.post ('/', async (req, res) => {
    const {date, status} = req.body;

    const finduserId = await User.findById(req.body.userId);
    const findvenueId = await Venue.findById(req.body.venueId);
    const findtimeslotId = await TimeSlot.findById(req.body.timeslotId);

    if (!finduserId || !findvenueId || !findtimeslotId){
        return res.status(404).json({ message: 'Failed to post data' })
    };

    try{
        const createBooking = new Booking({userId: finduserId ,venueId: findvenueId, timeslotId: findtimeslotId, date, status});
        const saveBooking = await createBooking.save();
        res.status(201).json(saveBooking);
        console.log('Saved Booking:', saveBooking);
    }
    catch(err){
        console.error(err); 
        res.status(500).json('Users Not Found!');
    }
})

// PUT Methods
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {userId ,venueId , timeslotId, date, status} = req.body;

    const finduserId = await User.findById(req.body.userId);
    const findvenueId = await Venue.findById(req.body.venueId);
    const findtimeslotId = await TimeSlot.findById(req.body.timeslotId);

    if (!finduserId || !findvenueId || !findtimeslotId){
        return res.status(404).json({ message: 'Failed to post data' })
    };

    try{
        const updateBooking = await Booking.findByIdAndUpdate(id, {userId ,venueId , timeslotId, date, status});
        if (!updateBooking) {
            return res.status(401).json('Updating Booking Is Failed!');
        }
        res.status(200).json('Booking updated successfully!');
    }
    catch(err){
        console.error(err); 
        res.status(500).json('Users Update Failed!');
    }
})

// DELETE Methods
router.delete('/:id', async (req, res) => { 
    const {id} = req.params;
    try{
        const deleteBooking = await Booking.findByIdAndDelete(id)
        if (!deleteBooking) {
            return res.status(401).json('Deleting Booking Is Failed!');
        }
        res.status(201).json('Booking Deleted Successfully!');
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Somthing Went Wrong!');
    }
});


export default router;