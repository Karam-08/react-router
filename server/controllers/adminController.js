/**
 * Admin Controller
 * 
 * - Admin only endpoints to view/manages all users and courses
 * 
 * All routes using these controllers should be protected with:
 * - requireAuth
 * - requireAdmin
 */

const User = require("../models/User")
const Course = require("../models/Course")

// GET /api/admin/users
async function getAllUsers(req, res, next){
    try{
        const users = (await User.find().select("-passwordHash")).sort({createAt: -1})
        res.json({data: users})
    }catch(err){
        next(err)
    }
}

// DELETE /api/admin/users/:id
// Also deletes that users' courses
async function deleteUser(req, res, next){
    try{
        const targetId = req.params.targetId
        if(String(targetId) === String(req.user.id)){
            return res.status(400).json({error: "You cannot delete your own admin account"})
        }

        const deletedUser = await User.findByIdAndDelete(targetId)
        if(!deletedUser) return res.status(404).json({error: "User Not Found"})

        await Course.deleteMany({owner: targetId})
        res.json({data: {deletedUser: targetId}})
    }catch(err){
        next(err)
    }
}

// GET /api/admin/courses
// Include populate for owner, name, email, role
// Sort data ascending order

async function getAllCourses(req, res, next){
    try{
        const courses = await Course.find().populate("owner", "name email role").sort({createdAt: -1})
        res.json({data: courses})
    }catch(err){
        next(err)
    }
}

// DELETE /api/admin/courses/:id
async function deleteCourseAsAdmin(req, res, next){
    try{
        const deleted = await Course.findByIdAndDelete(req.params.id)
        if(!deleted) return res.status(404).json({error: "Course not found"})

        res.json({data:deleted})
    }catch(err){
        next(err)
    }
}

module.exports = {getAllCourses, deleteUser, getAllUsers, deleteCourseAsAdmin}