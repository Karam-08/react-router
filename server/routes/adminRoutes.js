const express = require('express')
const router = express.Router()

const {requireAuth} = require("../middleware/authMiddleware")
const {requireAdmin} = require("../middleware/adminMiddleware")

const{
    getAllUsers,
    deleteUser,
    getAllCourses,
    deleteCourseAsAdmin
} = require("../controllers/adminController")