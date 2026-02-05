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

router.use(requireAuth)
router.use(requireAdmin)

router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser)
router.delete('/courses/:id', deleteCourseAsAdmin)
router.get('/course', getAllCourses)

module.exports = router