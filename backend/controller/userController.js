const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


exports.registerUser = async (req, res) => {
    try {
        const {userName,email,password} = req.body;
        const user = await User.create({
            userName,email,password
        });
        sendToken(user,201,res);
    }
    catch (error) {
        console.log(error);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //checking if user has given password and both 
        if (!email || !password) {
            res.send("Enter email or password");
            return false;
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.send("Invalid User");
            return false;
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            res.send("Invalid Email or password");
            return false;
        }
        sendToken(user,200,res);
        console.log("userId = ",user);
        console.log("\n\n\n Login success \n\n\n");
    }
    catch (error) {
        console.log(error);
    }
};

//Logout User

exports.logoutUser = async(req,res)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Loged Out",
    });
    console.log("logout");
};

//Get all users

exports.getAllUser = async (req, res) => {
    try {
        let users = await User.find();
        if (users.length > 0) {
            res.send(users);
            console.log(users);
        }
        else {
            res.send({ result: "No User found !!" })
        }
    } 
    catch (error) {
        console.log(error);
    }
};

//invalidRouteHandle 
exports.invalidRouteHandle = async (req,res)=>{
    try {
        res.end(`404 page not found`);
    } catch (error) {
        console.log("error ", error)
    }
}