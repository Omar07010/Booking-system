import express from 'express';
import TimeSlot from '../models/timeslot.js';
import Venue from '../models/venue.js';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config()

// GET Methods
router.get ('/', async (req, res) => {
    try{
        const getTimeSlots = await TimeSlot.find().populate('venueId');
        res.status(201).json(getTimeSlots);
    }
    catch(err){
        console.error(err); 
        res.status(500).json('TimeSlots Not Found!');
    }
})
router.get ('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const getTimeSlot = await TimeSlot.findById(id);
        res.status(201).json(getTimeSlot);
    }
    catch(err){
        console.error(err); 
        res.status(500).json('TimeSlot Not Found!');
    }
})

// POST Methods
router.post ('/', async (req, res) => {
    const { startTime, endTime, availability} = req.body;

    const findvenue = await Venue.findById(req.body.venueId);
    
    if (!findvenue){
        return res.status(404).json({ message: 'Failed to post data' })
    };
    
    try{
        const createTimeSlot = new TimeSlot({venueId: findvenue, startTime, endTime, availability});
        const saveTimeSlot = await createTimeSlot.save();
        res.status(201).json({saveTimeSlot, id: saveTimeSlot._id });
    }
    catch(err){
        console.error(err); 
        res.status(500).json('Timeslot Not Found!');
    }
})

// PUT Methods
router.put('/:id', async (req, res) => { 
    const {id} = req.params;
    const {venueId, startTime, endTime, availability} = req.body;

    const findvenueId = await Venue.findById(req.body.venueId);
console.log(findvenueId);

    if (!findvenueId){
        return res.status(404).json({ message: 'Failed to update data' })
    };


    try{
        const updateTimeSlot = await TimeSlot.findByIdAndUpdate(id, {venueId, startTime, endTime, availability},
            {new: true}
        )
        if (!updateTimeSlot) {
            return res.status(401).json('Updating Timeslot Is Failed!');
        }
        res.status(201).json(updateTimeSlot);
    }
    catch(err){
        console.error(err);       
        res.status(500).json(err);
    }
});

// DELETE Methods
router.delete('/:id', async (req, res) => { 
    const {id} = req.params;
    try{
        const deleteTimeslot = await TimeSlot.findByIdAndDelete(id)
        if (!deleteTimeslot) {
            return res.status(401).json('Deleting Timeslot Is Failed!');
        }
        res.status(201).json('User Deleted Successfully!');
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Somthing Went Wrong!');
    }
});



export default router;