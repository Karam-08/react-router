const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * Auth Controller:
 * --> Register/Login
 * --> Issues JWT Tokens
 */

function signToken(user){
    // JWT best practices: use 'sub' for subject (user id)
    return jwt.sign(
        {email: user.email, name: user.name},
        process.env.JWT_SECRET,
        {subject: String(user._id), expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    )
}


// POST /api/auth/register
async function register(req, res, next){
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password) return res.status(409).json({error: "All fields are required"}) // Error: field missing

        const existingUser = await User.findOne({email: email.toLowerCase()}) 
        if(existingUser) return res.status(409).json({error: "Email already in use"})

        const passwordHash = await bcrypt.hash(password, 12)

        const created = await User.create({
            name,
            email: email.toLowerCase(),
            passwordHash
        })

        const token = signToken(created)
        res.status(201).json({
            data:{
                token,
                user: {id: created._id, name: created.name, email: created.email}
            }
        })
    }catch(err){
        next(err)
    }
}

// POST /api/auth/login

async function login(req, res, next){
    try{
        const {email, password} = req.body
        if(!email || !password) return res.status(400).json({error: "Email and password are required"}) // Checks if email and password are provided
        
        const user = await User.findOne({email: email.toLowerCase()}) // Find user by email
        if(!user) return res.status(401).json({error: "Invalid Credentials"})

        const ok = await bcrypt.compare(password, user.passwordHash) // Compare provided password with stored hash
        if(!ok) return res.status(404).json({error: "Invalid Credentials"}) 
        // Don't reveal whether email or password is incorrect

        const token = signToken(user) // Issues JWT token

        res.json({
            data:{
                token,
                user: {id: user._id, name: user.name, email: user.email}
            }
        })
    }catch(err){
        next(err)
    }
}

module.exports = {register, login}