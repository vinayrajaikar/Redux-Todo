import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { response } from "express";


// generate access and refresh Token

const generateAccessAndRefreshToken= async(userId)=>{
    try{
        const user = await User.findById(userId);
        // console.log(user);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // save refresh token in db
        user.refreshToken =refreshToken;
        await user.save({validateBeforeSave:false})

        return {accessToken, refreshToken}
    }
    catch(err){
        throw new ApiError(500, "Something went wrong while generating access and referesh token")
    }
}


// Register
const registerUser=asyncHandler(async(req,res)=>{
    // res.status(200).json({
    //     message: "OKKK"
    // })
// ---------------------------------------------------------------------------
    // get user details
    const {fullName,email,username,password} = req.body;
    // -------------------------------------
    if(!fullName || !password || !username || !email){
        throw new ApiError(400, "All fields are required");
    }

    // --------------------------------------------
    // check user already exist :username,email
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "Username or email already exists");
    }
    // console.log(existedUser)

    // ---------------------------------------------------
    // create user object - create entry in db
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password
    });

    // Log user creation status
    if (!user) {
        console.error("Error during user creation");
    }

    // ---------------------------------------------------
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // check for user creation
   console.log(createdUser);

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating user")
    }

    // ---------------------------------------------------------
    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})


// Login
const loginUser = asyncHandler( async(req,res) => {
    // get user details
    const {username,email, password} = req.body;

    if(!(username || email)){
        throw new ApiError(400, "Username or email required");
    }

    console.log(username);
    console.log(email);

    // find user
    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Incorrect password")
    }

    // generate access refreshToken
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);

    // set cookie
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly: true,
        secure: true,
        sameSite:"none"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    // accessToken: accessToken,
                    // refreshToken: refreshToken
                }, 
                "User logged in successfully")
        )
})


// Logout

const LogoutUser =asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options={
        httpOnly: true,
        secure: true,
        sameSite:"none"
    }

    return res
       .status(200)
       .clearCookie("accessToken", options)
       .clearCookie("refreshToken", options)
       .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully")
        )
})



export{
    registerUser,
    loginUser,
    LogoutUser
}