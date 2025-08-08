// Helps in authorizing permissions for trying to access admin endpoints

const authorize = (role) => {
    return function (req,res,next) {
        if(!req.user || req.user.role !== role) {
            return res.status(403).json({error:"Forbidden"});
        }
        next()
    }
}

export default authorize;