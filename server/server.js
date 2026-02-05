require("dotenv").config();

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const connectDB = require('./config/db.js')
const User = require('./models/User.js')

const authRoutes = require('./routes/authRoutes.js')
const courseRoutes = require('./routes/courseRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')
const errorHandler = require('./middleware/errorHandler.js')

// const {connect} = require('mongoose')

const app = express()

// Middleware
app.use(cors()) // Alls the frontend to call the backend
app.use(express.json()) // Parses the JSON request bodies
app.use(express.urlencoded({extended: true})) // Parses Form data for login IF NEEDED

// Health Check
app.get('/api/health', (req, res) => res.json({ok: true}))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/admin', adminRoutes)

// Error middleware goes last
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGODB_URI).then(() =>{
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
})