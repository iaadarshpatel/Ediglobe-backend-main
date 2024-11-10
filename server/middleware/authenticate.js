import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    // Get token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        req.user = decoded; // Attach decoded user info to the request object
        next(); // Move to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


export default authenticate;
