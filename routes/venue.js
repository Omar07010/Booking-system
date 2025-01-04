import express from 'express';
import TimeSlot from '../models/timeslot.js';
import Venue from '../models/venue.js';
import dotenv, { populate } from 'dotenv';

const router = express.Router();
dotenv.config()

// GET Methods
router.get ('/', async (req, res) => {
    try{
        const getVenues = await Venue.find().populate('availability');
        res.status(201).json(getVenues);
    }
    catch(err){
        console.error(err); 
        res.status(500).json('Venue Not Found!');
    }
})
router.get ('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const getVenue = await Venue.findById(id);
        res.status(201).json(getVenue).populate('availability');
    }
    catch(err){
        console.error(err); 
        res.status(500).json('TimeSlot Not Found!');
    }
})

// POST Methods
router.post ('/', async (req, res) => {
    const {name, location, capacity, description} = req.body;

    const findavailability = await TimeSlot.findById(req.body.availability);

    if (!findavailability){
        return res.status(404).json({ message: 'Failed to post data' })
    };

    try{
        const createVenue = new Venue({name, location, capacity, description, availability: findavailability});
        const savecreateVenue = await createVenue.save();
        // Send the ID in the response before returning
        res.status(201).json({savecreateVenue, id: savecreateVenue._id });
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
})

// PUT Methods
router.put('/:id', async (req, res) => { 
    const {id} = req.params;
    const {name, location, capacity, description} = req.body;

    const findavailability = await TimeSlot.findById(req.body.availability);

    if (!findavailability){
        return res.status(404).json({ message: 'Failed to post data' })
    };

    try{
        const updateVenue = await Venue.findByIdAndUpdate(id, {name, location, capacity, description, availability: findavailability},
            {new: true}
        )
        if (!updateVenue) {
            return res.status(401).json('Updating Venue Is Failed!');
        }
        res.status(201).json(updateVenue);
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Somthing Went Wrong!');
    }
});

// DELETE Methods
router.delete('/:id', async (req, res) => { 
    const {id} = req.params;
    try{
        const deleteVenue = await Venue.findByIdAndDelete(id)
        if (!deleteVenue) {
            return res.status(401).json('Deleting Venue Is Failed!');
        }
        res.status(201).json('Venue Deleted Successfully!');
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Somthing Went Wrong!');
    }
});


export default router;