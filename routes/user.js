import express from 'express';
import User from '../models/user.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();
const router = express.Router()

// GET Methods
router.get('/', async (req, res) => { 
    try{
        const user = await User.find();
        res.status(201).json(user);
    }
    catch(err){
        console.error(err); 
        res.status(500).json('Users Not Found!');
    }
});

router.get('/:id', async (req, res) => { 
    const {id} = req.params
    try{
        const user = await User.findById(id);
        res.status(201).json(user);
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Users Not Found!');
    }
});

// POST Methods
router.post('/', async (req, res) => { 
    const {username, email, password, role} = req.body
    try{
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, email, password: hashPassword, role});
        const saveUser = await newUser.save()
        res.status(201).json({saveUser, id: saveUser._id});
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Add User Failed!');
    }
});

router.post('/login', async (req, res) => { 
    const {email, password} = req.body
    try{
        const user = await User.findOne({email});
        if (!user) {
            res.status(500).json('User Not Found!');
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(500).json('Unvalid Email Or Password!');
        }
        if (email && comparePassword) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {expiresIn: '7d'})
            return  res.status(201).json({user: user.email, token: token})
        }
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Add User Failed!');
    }
});

router.post('/register', async (req, res) => { 
    const {username, email, password, role} = req.body
    try{
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({username, email, password: hashPassword, role});
        const saveUser = await user.save()
        if (!saveUser) {
            console.error(error);
            
        }
        res.status(201).json({saveUser, id: saveUser._id});
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Add User Failed!');
    }
});

// PUT Methods
router.put('/:id', async (req, res) => { 
    const {id} = req.params;
    const {username, email, password, role} = req.body;
    try{
        const hashPassword = await bcrypt.hash(password, 10);
        const updateUser = await User.findByIdAndUpdate(id, {username, email, password: hashPassword, role},
            {new: true}
        )
        if (!updateUser) {
            return res.status(401).json('Updating User Is Failed!');
        }
        res.status(201).json(updateUser);
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
        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(401).json('Deleting User Is Failed!');
        }
        res.status(201).json('User Deleted Successfully!');
    }
    catch(err){
        console.error(err);       
        res.status(500).json('Somthing Went Wrong!');
    }
});


export default router;