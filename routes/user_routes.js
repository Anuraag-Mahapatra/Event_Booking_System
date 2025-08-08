import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secretKey = "fjsad;flj;dsjfl;sjdaf;";


// Register a new User
router.post('/register', async (req,res) => {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email:email})
    if(existingUser) {
        return res.status(400).json({error:"User already registered with this email!"})
    }

    try {
        const user = await User.create({name,email,password,role:"user"});
        const token = jwt.sign({id:user._id, email:email, role:user.role}, secretKey, {expiresIn:'1h'});
        res.status(201).json({message:"Registered successfully", token:token});
    } catch (e) {
        return res.status(400).json({error:e.message});
    }

})


// Login
router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const existingUser = await User.findOne({email:email});
    
    if(!existingUser || password!=existingUser.password) {
        return res.status(400).json({message:"Invalid Credentials"})
    }
    const token = jwt.sign({id:existingUser._id ,email:email, role:existingUser.role}, secretKey, {expiresIn:'1h'})
    res.status(200).json({name:existingUser.name,email, token:token});
})

export default router;