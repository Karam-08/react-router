require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * JWT auth middleware:
 * - Reads the Authorization header: 
 *       Standard part of request headers for after logins showing continuous access through "Bearer <token>"
 * - Verifies the token
 * - Attaches the user info to req.user <=== IMPORTANT
 */

function requireAuth(req, res, next){
    try{
        const authHeader = req.headers.authorization || ""
        const [scheme, token] = authHeader.split(" ")

        if(scheme !== "Bearer" || !token){
            return res.status(401).json({error: "Missing or invalid Authorization Header"})
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // Attach authenticated user to required for controllers to use
        // payload.sub = _id from mongodb
        req.user = {
            id: payload.sub, 
            email: payload.email, 
            name: payload.name
        }
        next()

    }catch(err){
        return res.status(401).json({error: "Invalid or Expired Token"})
    }
}

module.exports = {requireAuth}