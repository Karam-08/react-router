/**
 * Admin middleware:
 * - requires req.user set by requireAuth middleware
 * - checks the role from token payload
 */

function requireAdmin(req, res, next){
    if(!req.user || req.user.role !== "admin"){
        return res.status(403).json({error: "Admin Access Required"})
    }
    next();
}

module.exports = {requireAdmin}