const mongoose = require("mongoose")

/**
 * Course belongs to a user(owner) for per-user data isolation
 */

const courseSchema = new mongoose.Schema(
    {
        owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        title: {type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"]},
        level: {type: String, default: "", maxlength: 2000},
        published: {type: Boolean, default: true}
    },
    {timestamps: true}
)

modules.exports = mongoose.models.Course || mongoose.model("Course", courseSchema);