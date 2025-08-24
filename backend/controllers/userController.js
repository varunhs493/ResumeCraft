import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import express  from 'express';
import jwt from 'jsonwebtoken';

//generate a JWT token
const generateToken=(userId)=>{
  return jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn: '30d'});
}

export const registerUser=async (req, res) => {
  try{
    const {name,email,password}=req.body;

    //if already exists
    const userExists=await User.findOne({email})
    if(userExists){
      return res.status(400).json({message: "User already exists"});
    }
    if(password.lenght < 8){
      return res.status(400).json({success:false ,message: "Password must be at least 8 characters long"});
    }

    //hashing password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password, salt);

    //create user
    const user=await User.create({
      name,
      email,
      password: hashedPassword
    })
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }
  catch(error){
    res.status(500).json({
      message:"Server error",
      error: error.message
    })
  }
}

//login function
export const loginUser=async (req,res) => {
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({message: "invalid email or password"});
    }

    //compare password
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(500).json({message: "invalid email or password"});
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })


}
catch(error){
    res.status(500).json({
      message:"Server error",
      error: error.message
    })
  }
}

  //getuser function
export const getUserProfile=async (req, res) => {
  try{
    const user= await User.findById(req.user._id).select('-password');
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    res.json(user)
  }
  catch(error){
    res.status(500).json({
      message:"Server error",
      error: error.message
    })
  }
}