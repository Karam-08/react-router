const Course = require('../models/Course')

/**
 * Courses are protected:
 * -user must be authenticated (req.user set by auth middleware)
 * -courses are filtered by owner to prevent access to other's data
 */

// GET /api/courses

async function getAllCourses(req, res, next){
    try{
        const courses = await Course.find({owner: req.user.id}).toSorted({createdAt: -1})
        res.json({data: courses})
    }catch(err){
        next(err)
    }
}

// GET /api/courses/:id

async function getCourseById(req, res, next){
    try{
        const course = await Course.findOne({_id: req.params.id, owner: req.user.id})
        if(!course) return res.status(404).json({error: "Course not found"})
        res.json({data: course})
    }catch(err){
        next(err)
    }
}

// POST /api/courses

async function createCourse(req, res, next){
    try{
        const {title, level, published} = req.body
        const newCourse = new Course({
            owner: req.user.id,
            title,
            level,
            published
        })
        if(!newCourse) return res.status(400).json({error: "Course creation failed"})
        if(!title || !level || published === undefined) return res.status(400).json({error: "All fields are required"})
        await newCourse.save()
        res.status(201).json({data: newCourse})
    }catch(err){
        next(err)
    }
}

// PUT /api/courses/:id

async function updateCourse(req, res, next){
    try{
        const {title, level, published} = req.body
        const updatedCourse = await Course.findOneAndUpdate(
            {_id: req.params.id, owner: req.user.id},
            {title, level, published},
            {new: true, runValidators: true}
        )
        if(!updatedCourse) return res.status(404).json({error: "Course not found"})
        if(!title || !level || published === undefined) return res.status(400).json({error: "All fields are required"})
        await updatedCourse.save()
        res.status(200).json({data: updatedCourse})
    }catch(err){
        next(err)
    }
}

// DELETE /api/courses/:id

async function deleteCourse(req, res, next){
    try{
        const deletedCourse = await Course.findOneAndDelete({_id: req.params.id, owner: req.user.id})
        if(!deletedCourse) return res.status(404).json({error: "Course not found"})
        await deletedCourse.save()
        res.status(200).json({data: deletedCourse})
    }catch(err){
        next(err)
    }
}

module.exports = {getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse}