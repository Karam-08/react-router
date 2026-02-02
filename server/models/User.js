const mongoose = require("mongoose");
/**
 * User model for authentication
 * Password is stored in hashed format NEVER PLAIN TEXT
 * 
 * role:
 * -user (default) can only manage their OWN courses
 * -admin can access admin dashboard + manage ALL users/courses
 */

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true, maxlength: 80},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        passwordHash: {type: String, required: true},
        role: {type: String, enum: ["user", "admin"], default: "user"}
    },
    {timestamps: true}
)

module.exports = mongoose.models.UserSchema || mongoose.model("User", userSchema);