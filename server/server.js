require("dotenv").config();

const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db.js')
const authRoutes = require('./routes/authRoutes.js')
const courseRoutes = require('./routes/courseRoutes.js')
const errorHandler = require('./middleware/errorHandler.js')

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

// Error middleware goes last
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGODB_URI).then(() =>{
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
})