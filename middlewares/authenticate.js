import jwt from 'jsonwebtoken';

const secretKey = "fjsad;flj;dsjfl;sjdaf;";

// Checks whether the user has logged in or not and verifies it using its token 

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied! No token provided" })
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

export default auth;